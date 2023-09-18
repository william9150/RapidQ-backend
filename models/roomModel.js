const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        select: true,
        trim: true,
    },
    room_setting: {
        answering_seconds: {
            type: Number,
        },
        skipping_method: {
            type: String,
            enum: ["自動秒數", "自動人數", "僅手動"],
        },
        realtime_battle: {
            type: Boolean,
        },
        group_method: {
            type: String,
            enum: ["隨機分組", "預設分隊", "不分隊"],
        },
        group_num: {
            type: Number,
            default: 1,
            enum: [1, 2, 3, 4, 5, 6]
        },
        maximum_player: {
            type: Number,
        },
        group_list: {
            type: [
                {
                    code: {
                        type: String,
                    },
                    group_name: {
                        type: String,
                    },
                    status: {
                        type: String,
                        enum: ["等待中", "已結束"]
                    }
                },
            ],
            default: [],
        },
    },
    repository: {
        repoId: {
            type: mongoose.Schema.Types.ObjectId
        },
        repoName: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId
        },
        questions: {
            id: {
                type: mongoose.Schema.Types.ObjectId
            },
            type: {
                type: String,
                enum: ["單選", "排序"]
            },
            title: {
                type: String,
            },
            img: {
                type: String,
            },
            options: {
                type: [
                    {
                        idx: {
                            type: Number,
                        },
                        desc: {
                            type: String,
                        },
                        img: {
                            type: String,
                        }
                    }
                ]
            },
            answer: {
                type: Array[Number],
            }
        },
        createAt: {
            type: Date,
            default: Date.now(),
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
        },
    },
    createId: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: String,
        enum: ["尚未開始", "等待中", "遊玩中", "已結束"]
    },
    players_detail: [
        {
            code: {
                type: String,
            },
            group_name: {
                type: String,
            },
            status: {
                type: String,
                enum: ["連線中", "斷線", "已結束"]
            },
            name: {
                type: String,
                unique: true,
            },
            info: {
                ip: {
                    type: String,
                },
                user_agent: {
                    type: String,
                }
            }
        }
    ],
    playing_history: {
        leaderboard: {
            type: Array
        },
        leaderboard: {
            type: String,
        },
        statistics: {
            type: [
                {   
                    question: {
                        type: String,
                    },
                    type: {
                        type: String,
                        enum: ["單選", "排序"],
                    },
                    correct: {
                        type: Number,
                    },
                    total: {
                        tpye: Number,
                    }
                }
            ]
        },
        playing_time_sec: {
            type: Number,
        },
        playing_status: {
            type: String,
            enum: ["完賽", "房主關閉房間", "全部玩家均斷線", "系統連線逾時", "系統異常"],
        },
        error_msg: {
            type: String,
        },
        playing_records: {
            type: Array
        }
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
