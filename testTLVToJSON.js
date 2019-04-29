const getJSONFromTLV = require('./lib/tlv-json').getJSONFromTLV;

const BINARY_FILE_NAME = 'segment-binary.orch';

// 从orch文件读取json 参数：path
getJSONFromTLV(__dirname + '/' + 'z1.orch').then(res => {
    console.log(res)
})