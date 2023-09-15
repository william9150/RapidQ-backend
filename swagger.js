const swaggerAutogen = require('swagger-autogen')();
const definitions = require('./swagger-defintion');

const doc = {
    info: {
        title: 'RapidQ 賴皮怪',
        description: 'RapidQ is a party-game that makes it easy to create, share and play in minutes with your mobile.',
    },
    host: process.env.FRONTEND_URL,
    schemes: ['http', 'https'],
    tags: [{ name: 'Home', description: '首頁' }],
    definitions,
    securityDefinitions: {
        // Token
        Bearer: {
            type: 'apiKey',
            in: 'header', // can be "header", "query" or "cookie"
            name: 'Authorization', // name of the header, query parameter or cookie
            description: 'JWT Token',
        },
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js']; // 進入點/注入點，分析 router 和自動生成

swaggerAutogen(outputFile, endpointsFiles, doc);
