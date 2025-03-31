const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Clients API',
        description: 'API to manage clients and products'
    },
    host: process.env.HOST || 'http, https xxxxxxx',
    schemes: ['https', 'http']
    
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);