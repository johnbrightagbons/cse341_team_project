const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My E-commerce Api ',
    description: 'E-commerce  API',
  },
  host: process.env.HOST || 'https://cse341-team-project-zg01.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import('./index.js');
});
