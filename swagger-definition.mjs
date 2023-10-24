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
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODAwOGYxMDc4ZmMxYWEyZDNlNjU3OSIsImlhdCI6MTY4NjExMzY5MSwiZXhwIjoxNjg2NzE4NDkxfQ.MzuEB6mU7VOVeTIx9In7EYKPKbIwimKZd1eN7bEC9UE',
    userId: '648008f1078fc1aa2d3e6579',
    nickname: '小明',
  },
  message: '第三方登入 - 取得google 資訊',
};

const googleSignUp = {
  status: 'success',
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODAwOGYxMDc4ZmMxYWEyZDNlNjU3OSIsImlhdCI6MTY4NjExMzY5MSwiZXhwIjoxNjg2NzE4NDkxfQ.MzuEB6mU7VOVeTIx9In7EYKPKbIwimKZd1eN7bEC9UE',
    userId: '648008f1078fc1aa2d3e6579',
  },
  message: '第三方登入 google - 註冊',
};

const repoSuccess = {
  status: 'success',
  data: {
    repoName: '題庫名稱',
    isDelete: false,
    isPublic: true,
    _id: '65372af80f548077046dd4f7',
    updatedAt: '2023-10-24T03:37:37.533Z',
    userId: '65371d8861089a5098b1f8da',
    questions: [
      {
        answer: [2],
        _id: '6537368ed0a3c7678c4ae8b8',
        type: 'Single',
        title: '第一題',
        imgUrl: null,
        options: [
          {
            idx: 1,
            desc: '選項1',
            imgUrl: null,
          },
          {
            idx: 2,
            desc: '選項2',
            imgUrl: null,
          },
        ],
      },
    ],
    createdAt: '2023-10-24T02:24:56.867Z',
  },
};

const questionSuccess = {
  status: 'success',
  data: {
    question: {
      answer: [2],
      _id: '65373c01799ca45b48049b26',
      type: 'Single',
      title: '第一題',
      imgUrl: null,
      options: [
        {
          idx: 1,
          desc: '選項1',
          imgUrl: null,
        },
        {
          idx: 2,
          desc: '選項2',
          imgUrl: null,
        },
      ],
    },
  },
};
const reposSuccess = {
  status: 'success',
  data: [
    {
      repoName: '新專案1',
      isDelete: false,
      isPublic: true,
      _id: '65371e22fe7f854fbc25db5b',
      createAt: '2023-10-24T01:28:08.959Z',
      updatedAt: '2023-10-24T01:28:08.959Z',
      userId: '65371d8861089a5098b1f8da',
    },
  ],
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
  repoSuccess,
  questionSuccess,
};

export default definitions;
