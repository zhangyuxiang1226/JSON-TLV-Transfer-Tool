// import writeTLVFile from './lib/json-tlv';
// import getJSONFromTLV from './lib/tlv-json'
const writeTLVFile = require('./lib/json-tlv').writeTLVFile;
const j = {
    "mainTrack": 0,
    "tracks": [
        {
            "track": "audio",
            "segment": {
                "haveChildren": true,
                "loops": 0,
                "children": [
                    {
                        "loops": 1,
                        "duration": 134871,
                        "option": {
                            "uri": "orchestration://audio/test",
                            "streamType": 2
                        }
                    }
                ],
                "duration": 135000
            }
        },
        {
            "track": "audio",
            "segment": {
                "haveChildren": true,
                "loops": 1,
                "children": [
                    {
                        "isBlank": true,
                        "duration": 7734
                    },
                    {
                        "loops": 1,
                        "duration": 3204,
                        "option": {
                            "uri": "orchestration://sound/sound11",
                            "streamType": 2
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 6805
                    },
                    {
                        "loops": 1,
                        "duration": 3204,
                        "option": {
                            "uri": "orchestration://sound/sound22",
                            "streamType": 2
                        }
                    }
                ]
            }
        },
        {
            "track": "emotion",
            "segment": {
                "haveChildren": true,
                "loops": 1,
                "children": [
                    {
                        "isBlank": true,
                        "duration": 10725
                    },
                    {
                        "loops": 1,
                        "duration": 6641,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "loops": 1,
                        "duration": 6642,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "loops": 1,
                        "duration": 6643,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "loops": 1,
                        "duration": 6644,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "loops": 1,
                        "duration": 6645,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "loops": 1,
                        "duration": 6646,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "loops": 1,
                        "duration": 6647,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "loops": 1,
                        "duration": 6648,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "loops": 1,
                        "duration": 6649,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "loops": 1,
                        "duration": 66410,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "loops": 1,
                        "duration": 66411,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 11614
                    },
                    {
                        "loops": 1,
                        "duration": 1560,
                        "option": {
                            "uri": "orchestration://emotion/parts"
                        }
                    }
                ]
            }
        }
    ]
};
const k = {
    "mainTrack": 0,
    "tracks": [
        {
            "track": "audio",
            "segment": {
                "haveChildren": true,
                "loops": 0,
                "children": [
                    {
                        "loops": 1,
                        "duration": 134871,
                        "option": {
                            "uri": "orchestration://audio/test",
                            "streamType": 2
                        }
                    }
                ],
                "duration": 135000
            }
        },
        {
            "track": "audio",
            "segment": {
                "haveChildren": true,
                "loops": 1,
                "children": [
                    {
                        "isBlank": true,
                        "duration": 33230
                    },
                    {
                        "loops": 1,
                        "duration": 3204,
                        "option": {
                            "uri": "orchestration://sound/sound1",
                            "streamType": 2
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 9303
                    },
                    {
                        "loops": 1,
                        "duration": 3204,
                        "option": {
                            "uri": "orchestration://sound/sound22",
                            "streamType": 2
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 15139
                    },
                    {
                        "loops": 1,
                        "duration": 3204,
                        "option": {
                            "uri": "orchestration://sound/sound11",
                            "streamType": 2
                        }
                    }
                ]
            }
        },
        {
            "track": "emotion",
            "segment": {
                "haveChildren": true,
                "loops": 1,
                "children": [
                    {
                        "isBlank": true,
                        "duration": 1924
                    },
                    {
                        "loops": 1,
                        "duration": 1560,
                        "option": {
                            "uri": "orchestration://emotion/parts"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 1254
                    },
                    {
                        "loops": 1,
                        "duration": 6641,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 691
                    },
                    {
                        "loops": 1,
                        "duration": 1510,
                        "option": {
                            "uri": "orchestration://emotion/insertconnect"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 1030
                    },
                    {
                        "loops": 1,
                        "duration": 6641,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 2277
                    },
                    {
                        "loops": 1,
                        "duration": 1626,
                        "option": {
                            "uri": "orchestration://emotion/bodychange"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 792
                    },
                    {
                        "loops": 1,
                        "duration": 6641,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 750
                    },
                    {
                        "loops": 1,
                        "duration": 1560,
                        "option": {
                            "uri": "orchestration://emotion/parts"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 1875
                    },
                    {
                        "loops": 1,
                        "duration": 6641,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 1382
                    },
                    {
                        "loops": 1,
                        "duration": 1560,
                        "option": {
                            "uri": "orchestration://emotion/parts"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 1353
                    },
                    {
                        "loops": 1,
                        "duration": 6641,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 423
                    },
                    {
                        "loops": 1,
                        "duration": 1626,
                        "option": {
                            "uri": "orchestration://emotion/bodychange"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 6449
                    },
                    {
                        "loops": 1,
                        "duration": 6641,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 2495
                    },
                    {
                        "loops": 1,
                        "duration": 1510,
                        "option": {
                            "uri": "orchestration://emotion/insertsteer"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 4411
                    },
                    {
                        "loops": 1,
                        "duration": 3483,
                        "option": {
                            "uri": "orchestration://emotion/inputsensor"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 1676
                    },
                    {
                        "loops": 1,
                        "duration": 1560,
                        "option": {
                            "uri": "orchestration://emotion/parts"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 1063
                    },
                    {
                        "loops": 1,
                        "duration": 3483,
                        "option": {
                            "uri": "orchestration://emotion/inputsensor"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 2353
                    },
                    {
                        "loops": 1,
                        "duration": 1560,
                        "option": {
                            "uri": "orchestration://emotion/parts"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 1331
                    },
                    {
                        "loops": 1,
                        "duration": 3483,
                        "option": {
                            "uri": "orchestration://emotion/inputsensor"
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 163109
                    },
                    {
                        "loops": 1,
                        "duration": 6641,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    },
                    {
                        "loops": 1,
                        "duration": 6641,
                        "option": {
                            "uri": "orchestration://emotion/normal"
                        }
                    }
                ]
            }
        }
    ]
};
const s = {
    "mainTrack": 0,
    "tracks": [
        {
            "track": "servo",
            "segment": {
                "haveChildren": true,
                "loops": 1,
                "duration": 1200,
                "children": [
                    {
                        "isBlank": false,
                        "duration": 300,
                        "option": {
                            "servoId": "1",
                            "angleAbsolute": true,
                            "angle": -130,
                            "speed": 180
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 300
                    },
                    {
                        "isBlank": false,
                        "duration": 300,
                        "option": {
                            "servoId": "1",
                            "angleAbsolute": true,
                            "angle": 79,
                            "speed": 180
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 300
                    }
                ]
            }
        },
        {
            "track": "servo",
            "segment": {
                "haveChildren": true,
                "loops": 1,
                "duration": 1200,
                "children": [
                    {
                        "isBlank": false,
                        "duration": 300,
                        "option": {
                            "servoId": "2",
                            "angleAbsolute": true,
                            "angle": 95,
                            "speed": 180
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 300
                    },
                    {
                        "isBlank": false,
                        "duration": 300,
                        "option": {
                            "servoId": "2",
                            "angleAbsolute": true,
                            "angle": -101,
                            "speed": 180
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 300
                    }
                ]
            }
        },
        {
            "track": "servo",
            "segment": {
                "haveChildren": true,
                "loops": 1,
                "duration": 1200,
                "children": [
                    {
                        "isBlank": false,
                        "duration": 300,
                        "option": {
                            "servoId": "3",
                            "angleAbsolute": true,
                            "angle": 86,
                            "speed": 180
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 300
                    },
                    {
                        "isBlank": false,
                        "duration": 300,
                        "option": {
                            "servoId": "3",
                            "angleAbsolute": true,
                            "angle": -123,
                            "speed": 180
                        }
                    },
                    {
                        "isBlank": true,
                        "duration": 300
                    }
                ]
            }
        }
    ]
}
const BINARY_FILE_NAME = 'segment-binary.orch';
// 写文件 参数：json, path
writeTLVFile(s, __dirname + '/' + 'z1.orch');
