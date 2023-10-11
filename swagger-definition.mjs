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
};

const googleCallback = {
  status: 'success',
  data: {
      oauth_register: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODAwOGYxMDc4ZmMxYWEyZDNlNjU3OSIsImlhdCI6MTY4NjExMzY5MSwiZXhwIjoxNjg2NzE4NDkxfQ.MzuEB6mU7VOVeTIx9In7EYKPKbIwimKZd1eN7bEC9UE',
      userId: '648008f1078fc1aa2d3e6579',
      nickname: '小明',
  },
  message: '第三方登入 - 取得google 資訊',
};

const googleSignUp = {
  status: 'success',
  data: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODAwOGYxMDc4ZmMxYWEyZDNlNjU3OSIsImlhdCI6MTY4NjExMzY5MSwiZXhwIjoxNjg2NzE4NDkxfQ.MzuEB6mU7VOVeTIx9In7EYKPKbIwimKZd1eN7bEC9UE',
      userId: '648008f1078fc1aa2d3e6579',
  },
  message: '第三方登入 google - 註冊',
};

const definitions = { 
  Success, 
  Error400, 
  ErrorToken, 
  Error404, 
  Error500,
  createRoomDetail,
  googleCallback,
  googleSignUp,
 };

export default definitions;