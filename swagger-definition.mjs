const Success = {
  message: '成功訊息',
};

const Error400 = {
  message: '錯誤訊息',
};

const ErrorToken = {
  status: 'false',
  message: '你尚未登入',
  error: {
    name: '40300',
  },
};

const Error404 = {
  message: '外太空也找不到這個頁面',
};

const Error500 = {
  message: '系統錯誤，請稍後再試',
};

const createRoomDetail = {
  name: 'Erik 建立的遊戲',
  room_setting: {
    answering_seconds: 30,
    skipping_method: '僅手動',
    battle_situation: true,
    group_method: '隨機分組',
    group_num: 2,
    maximum_player: 150,
  },
  creator_id: 'uuid',
};

export { Success,
         Error400,
         ErrorToken,
         Error404,
         Error500,
         createRoomDetail,
};
