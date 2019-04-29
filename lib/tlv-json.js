/* 
    TLV转为JSON，segment-binary.orch中读出并转成JSON
*/
const fs = require('fs');
const BINARY_FILE_NAME = 'segment-binary.orch';
const optionsArr = [
    'uri', 'movingSpeed', 'movingAngle',
    'movingDistance', 'turningSpeed', 'turningAngle',
    'option_duration', 'streamType', 'servoId', 'angle',
    'angleAbsolute', 'speed'
];
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
const tagMap = {
    1: "mainTrack",
    2: "segment",
    3: "loops",
    4: "duration",
    5: "isBlank",
    6: "uri",
    7: "movingSpeed",
    8: "movingDistance",
    9: "turningSpeed",
    10: "turningAngle",
    11: "streamType",
    12: "servoId",
    13: "angle",
    14: "angleAbsolute",
    15: "speed",
    16: "option_duration",
    17: "motion",
    18: "locomotion",
    19: "emotion",
    20: "servo",
    21: "audio",
    22: "movingAngle",
    23: "haveChildren",
};
function read(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}

// 十进制数组转字符串
function hexCharCodeToStr(hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr =
        trimedStr.substr(0, 2).toLowerCase() === "0x"
            ?
            trimedStr.substr(2)
            :
            trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
        console.log("Illegal Format ASCII Code!");
        return "";
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}
function decimalArrToStr(arr) {
    let r = [];
    arr.map((v, i) => {
        r.push(v.toString(16));
    });
    return hexCharCodeToStr(r.join(''));
}
// 使用arrayBuffer获取32位Uint值
function arrToGetUint32(arr) {
    const arrayBuffer = new ArrayBuffer(arr.length);
    const view = new DataView(arrayBuffer);
    arr.map((item, i) => {
        view.setUint8(i, item);
    });

    return view.getUint32(0);
}
// 使用arrayBuffer获取32位Uint值
function arrToGetFloat32(arr) {
    const arrayBuffer = new ArrayBuffer(arr.length);
    const view = new DataView(arrayBuffer);
    arr.map((item, i) => {
        view.setUint8(i, item);
    });

    return view.getFloat32(0);
}


function tlvArrToObj(arr) {
    // 认为传入的数组是tlv格式，arr[0]: tag, arr[1]: len, 剩余为value
    let obj = {};
    // 普通结构类型
    if (arr.length == 5 && typeMap[tagMap[arr[0] - 32]] !== 'String') {
        obj[tagMap[arr[0] - 32]] = typeMap[tagMap[arr[0] - 32]] === 'Boolean' ? Boolean(arr[4]) : arr[4];
    }
    else {
        // 字符串
        if (typeMap[tagMap[arr[0] - 32]] === 'String') {
            obj[tagMap[arr[0] - 32]] = decimalArrToStr(arr.slice(4));
        }
        // 浮点数 & 無符号整型
        else if (typeMap[tagMap[arr[0] - 32]] === 'Float' || typeMap[tagMap[arr[0] - 32]] === 'UInteger') {
            if (typeMap[tagMap[arr[0] - 32]] === 'Float') {
                obj[tagMap[arr[0] - 32]] = arrToGetFloat32(arr.slice(4));
            }
            else {
                obj[tagMap[arr[0] - 32]] = arrToGetUint32(arr.slice(4));

            }
        }
    }

    return obj;
}

function resolveAllTracks(originArr, trackArr) {
    let obj = {};
    originArr.map((v, i) => {
        // 查询 motion-17(49) locomotion-18(50) emotion-19(51) servo-20(52) audio-21(53)
        // 如果当前项是track tag 且i+2项是segment(34)，则认为该项是一个track
        if ((v === 49 || v === 50 || v === 51 || v === 52 || v === 53) && (originArr[i + 2] === 34 || (originArr[i + 1] === 129 && originArr[i + 3] === 34) || (originArr[i + 1] === 132 && originArr[i + 6] === 34))) {
            trackArr.push({
                "track": tagMap[v - 32],
                "segment": {}
            });

            // 保存index，对audio和servo特殊处理
            if (tagMap[v - 32] === 'audio') {
                obj[tagMap[v - 32] + '1'] === undefined ? obj[tagMap[v - 32] + '1'] = i : obj[tagMap[v - 32] + '2'] = i;
            }
            else if (tagMap[v - 32] === 'servo') {
                obj[tagMap[v - 32] + i] = i;
            }
            else {
                obj[tagMap[v - 32]] = i;
            }


        }
    });

    return obj;
}

function resolveSegment(segmentArr, obj = {}, isChild = false) {
    let start = 0;
    // 隔出L值的位置
    if (segmentArr[1] === 129) {
        start = 6;
    }
    else if (segmentArr[1] === 130) {
        start = 8;
    }
    else if (segmentArr[1] === 132) {
        start = 12;
    }
    else {
        start = 4;
    }

    let end = start + 5;
    let i = isChild ? 0 : start;
    while (i < segmentArr.length) {
        const item = segmentArr[i];
        if (tagMap[item - 32]) {
            // 是否有children
            if (tagMap[item - 32] === 'haveChildren' && segmentArr[i + 4] === 1) {
                Object.assign(obj, {
                    "haveChildren": true
                });
                i += 5;
            }
            else if (tagMap[item - 32] === 'haveChildren' && segmentArr[i + 4] === 0) {
                Object.assign(obj, {
                    "haveChildren": false
                });
                i += 5;
            }
            else if (tagMap[item - 32] === 'segment') {
                if (!obj['children']) {
                    obj['children'] = [];
                }
                // children的每项
                let arrLength = segmentArr[i + 1];
                obj['children'].push(resolveSegment(segmentArr.slice(i + 2, i + 2 + arrLength), {}, true));

                i = i + 2 + arrLength;
            }
            else {
                // 判断是否在option下
                if (optionsArr.indexOf(tagMap[item - 32]) > -1) {
                    if (!obj['option']) {
                        obj['option'] = {};
                    }
                    let arrLength = segmentArr[i + 1];
                    Object.assign(obj['option'], tlvArrToObj(segmentArr.slice(i, i + 2 + arrLength)))
                    i = i + 2 + arrLength;
                }
                else {

                    let arrLength = segmentArr[i + 1];
                    Object.assign(obj, tlvArrToObj(segmentArr.slice(i, i + 2 + arrLength)));
                    i = i + 2 + arrLength;
                }
            }
        }
        else {
            i++;
        }
    }

    return obj;
}

const JSON_FILE_NAME = 'segement.json';
function writeFile(fileName, json) {
    fs.writeFile(__dirname + '/' + fileName, json, { flag: 'a' }, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('写入成功');
        }
    });
}
async function getJSONFromTLV(tlvFilePath) {
    try {
        let obj = {};
        let arr = [];
        // let tlvBuffer = await read(__dirname + '/' + BINARY_FILE_NAME);
        let tlvBuffer = await read(tlvFilePath);
        let start = 0;
        let end = start + 5;
        arr = tlvBuffer.toJSON().data;
        // mainTrack
        let arr1 = arr.slice(start, end);
        obj = Object.assign(obj, tlvArrToObj(arr1));
        // tracks
        obj['tracks'] = [];
        let tracksIndexesObj = resolveAllTracks(arr, obj['tracks']); // { emotion: 5, audio1: 116, audio2: 167 }
        // 切出每个track的数组
        let rawTracks = []; // 存放分割出来的原始数组
        let trackKeys = Object.keys(tracksIndexesObj); // ["emotion", "audio1", "audio2"]
        trackKeys.map((v, i) => {
            if (trackKeys[i + 1]) {
                rawTracks.push(arr.slice(tracksIndexesObj[v], tracksIndexesObj[trackKeys[i + 1]]))
            }
            else {
                rawTracks.push(arr.slice(tracksIndexesObj[v]))
            }
        });

        rawTracks.map((v, i) => {
            Object.assign(obj['tracks'][i].segment, resolveSegment(v));
        });

        // 结果写入文件
        fs.stat(__dirname + '/' + JSON_FILE_NAME, function (err, stats) {
            if (err) {
                writeFile(JSON_FILE_NAME, JSON.stringify(obj));
                return
            }

            if (stats.isFile()) {
                fs.unlink(__dirname + '/' + JSON_FILE_NAME, function (err) {
                    writeFile(JSON_FILE_NAME, JSON.stringify(obj));
                });
            }
        });

        return obj;


    } catch (error) {
        console.log(error);
    }
}

// export default getJSONFromTLV;
module.exports.getJSONFromTLV = getJSONFromTLV;

