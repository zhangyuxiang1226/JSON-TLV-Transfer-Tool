// TODO:继续补充基本类型Map
const primativeMap = {
    'Boolean': {
        tag: 1,
        len: 1,
    },
    'UTiny': {
        tag: 3,
        len: 1,
    },
    'String': {
        tag: 13,
        len: null,
    },
    'Float': {
        tag: 10,
        len: 4,
    },
    'UInteger': {
        tag: 7,
        len: 4,
    },
    'Long': {
        tag: 8,
        len: 8,
    },
};

function strToBinary(str) {
    let a = str.split('');
    let b = [];
    for (let i = 0; i < a.length; i++) {
        const item = a[i];
        b.push(item.charCodeAt())
    }

    return b.join("") + 0;
}

/**
 * 生成基本类型TLV
 * @param {String} type 基本类型
 * @param {Number | String} val
 * @returns {Buffer}
 */
function genPrimativeTlv(type, val) {
    const tag = primativeMap[type].tag;
    const len = primativeMap[type].len || val.length;

    let buffer = null;
    if (type === 'String') {
        const arrayBuffer = new ArrayBuffer(2);
        const view = new DataView(arrayBuffer);
        let index = 0;

        view.setUint8(index, tag); // tag
        index++;

        const buf = Buffer.from(val, 'ascii');
        view.setUint8(index, buf.length); // len
        buffer = Buffer.concat([Buffer.from(arrayBuffer), buf]);
    }
    else if (type === 'Float') {
        const arrayBuffer = new ArrayBuffer(primativeMap[type].len + 2);
        const view = new DataView(arrayBuffer);
        let index = 0;

        view.setUint8(index, tag); // tag
        index++;
        view.setUint8(index, len); // len
        index++;
        // value
        view.setFloat32(index, val);
        buffer = Buffer.from(arrayBuffer);
    }
    else {
        const arrayBuffer = new ArrayBuffer(primativeMap[type].len + 2);
        const view = new DataView(arrayBuffer);
        let index = 0;

        view.setUint8(index, tag); // tag
        index++;
        view.setUint8(index, len); // len
        index++;
        // value
        if (primativeMap[type].len == 1) {
            view.setUint8(index, val);
        }
        else if (primativeMap[type].len == 4) {
            view.setUint32(index, val);
        }

        buffer = Buffer.from(arrayBuffer);

    }

    return buffer;
}

/**
 * 生成结构类型TLV
 * @param {Number} tag
 * @param {Buffer} value 传入一个Buffer，存的值已经是TLV结构
 * @returns {Buffer}
 */
function genConstructedTlv(tag, value) {
    // 处理tag 默认tag占一个字节
    // 结构类value是一个buffer
    const arrayBuffer1 = new ArrayBuffer(1);
    const view1 = new DataView(arrayBuffer1);
    view1.setUint8(0, tag | 0x20); // tag

    // 处理length，length <= 127 占一个字节；len > 127后，第一个字节为后续字节的个数，第二个字节开始为length的值， length <= 255 占两个字节；length > 255，共5个字节
    let arrayBuffer2 = null;
    if (value.length <= 127) {
        arrayBuffer2 = new ArrayBuffer(1);
        const view2 = new DataView(arrayBuffer2);
        view2.setUint8(0, value.length);
    }
    else if (value.length > 127 && value.length <= 255) {
        arrayBuffer2 = new ArrayBuffer(2);
        const view2 = new DataView(arrayBuffer2);
        view2.setUint8(0, 129); // 10000001
        view2.setUint8(1, value.length);
    }
    else if (value.length > 255) {
        arrayBuffer2 = new ArrayBuffer(5);
        const view2 = new DataView(arrayBuffer2);
        view2.setUint8(0, 132); // 10000100
        view2.setUint32(1, value.length);
    }



    const buffer1 = Buffer.from(arrayBuffer1);
    const buffer2 = Buffer.from(arrayBuffer2);
    const buffer3 = Buffer.from(value);


    return Buffer.concat([buffer1, buffer2, buffer3]);
}

/**
 * 生成Tag
 * @param {Number} tag
 * @param {Boolean} isConstructed 是否是结构类型
 * @returns {Number}
 */
function generateTag(tag, isConstructed) {
    return isConstructed ? tag | 0x20 : tag;
}

exports.cTLV = genConstructedTlv;
exports.pTLV = genPrimativeTlv;
exports.generateTag = generateTag;