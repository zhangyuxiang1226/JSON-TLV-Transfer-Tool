/* 
    JSON转TLV方法，最终写入text.txt二进制文件
*/
const fs = require('fs');
const genConstructedTlv = require('./tlv').cTLV;
const genPrimativeTlv = require('./tlv').pTLV;

const tagMap = {
    "mainTrack": 1,
    "motion": 17,
    "locomotion": 18,
    "emotion": 19,
    "servo": 20,
    "audio": 21,
    "segment": 2,
    "loops": 3,
    "duration": 4,
    "isBlank": 5,
    "uri": 6,
    "movingSpeed": 7,
    "movingDistance": 8,
    "movingAngle": 22,
    "turningSpeed": 9,
    "turningAngle": 10,
    "streamType": 11,
    "servoId": 12,
    "angle": 13,
    "angleAbsolute": 14,
    "speed": 15,
    "option_duration": 16,
    "haveChildren": 23,
};

const typeMap = {
    // 顶级
    'mainTrack': 'constructed',
    'motion': 'constructed',
    'locomotion': 'constructed',
    'emotion': 'constructed',
    'servo': 'constructed',
    'audio': 'constructed',
    'segment': 'constructed',
    // 底层
    'loops': 'UTiny',
    'duration': 'UInteger',
    'isBlank': 'Boolean',
    'uri': 'String',
    'movingSpeed': 'Float',
    'movingAngle': 'Float',
    'movingDistance': 'Float',
    'turningSpeed': 'Float',
    'streamType': 'UTiny',
    'servoId': 'String',
    'angle': 'Float',
    'angleAbsolute': 'Boolean',
    'speed': 'Float',
    'option_duration': 'UInteger',
    'haveChildren': 'Boolean',
};

function getSegmentBuffer(segment, A, isChild = false) {
    let arr = A || [];
    // 如果是children的子元素，则开头加一个segment的 tag 和 length
    if (isChild) {
        let temporaryArr = [];
        let childBuffer = getSegmentBuffer(segment, temporaryArr);
        arr.push(childBuffer.slice(0, 2));
    }

    for (const key in segment) {
        if (key != 'option' && key != 'children') {
            let value = segment[key];
            let tag = tagMap[key];
            let type = typeMap[key];
            arr.push(genConstructedTlv(tag, genPrimativeTlv(type, value)));
        }
        else if (key === 'children' && segment.children && segment.children.length > 0) {
            segment.children.forEach(v => {
                //对当前child补充一个 haveChildren属性
                let sortedNewObj = {};
                if (!v.children || v.children.length === 0) {
                    sortedNewObj.haveChildren = false;
                }

                for (const key in v) {
                    if (v.hasOwnProperty(key)) {
                        sortedNewObj[key] = v[key]
                    }
                }
                getSegmentBuffer(sortedNewObj, arr, true);
            });
        }
        else if (key === 'option' && !segment['haveChildren']) {
            for (const opKey in segment.option) {
                let val = segment.option[opKey];
                let t = tagMap[opKey];
                let tp = typeMap[opKey];
                arr.push(genConstructedTlv(t, genPrimativeTlv(tp, val)));
            }
        }
    }

    return genConstructedTlv(tagMap['segment'], Buffer.concat(arr));
}

function tlvTransfer(json) {
    if (json['mainTrack'] === undefined) return;
    let UTinyBuffer = genPrimativeTlv('UTiny', json['mainTrack']);
    let mainTrackBuffer = genConstructedTlv(tagMap['mainTrack'], UTinyBuffer);
    // 解析track
    let arr = [];
    if (json.tracks.length > 0) {
        json.tracks.forEach(item => {
            let trackBuffer = null;
            let segmentBuffer = getSegmentBuffer(item['segment']);

            trackBuffer = genConstructedTlv(tagMap[item['track']], segmentBuffer);
            arr.push(trackBuffer)
        });
    }

    return Buffer.concat([mainTrackBuffer, Buffer.concat(arr)])
}

// 结果写入文件
const BINARY_FILE_NAME = 'segment-binary.orch';
function myWriteFile(path, json) {
    fs.writeFile(path, tlvTransfer(json), { flag: 'a' }, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('写入成功');
        }
    });
}

function writeTLVFile(json, path) {
    fs.stat(path, function (err, stats) {
        if (err) {
            myWriteFile(path, json);
            return
        }

        if (stats.isFile()) {
            fs.unlink(path, function (err) {
                myWriteFile(path, json);
            });
        }
    });

}

module.exports.writeTLVFile = writeTLVFile;
// export default writeTLVFile;

