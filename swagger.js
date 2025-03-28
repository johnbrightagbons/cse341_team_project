const swaggerAutogen = require('swagger-autogen')();

const doc = {
<<<<<<< HEAD
    info: {
        title: 'Clients API',
        description: 'API to manage clients and products'
    },
    host: process.env.HOST || 'http, https xxxxxxx',
    schemes: ['https', 'http']
    
=======
  info: {
    title: 'My E-commerce Api ',
    description: 'E-commerce  API',
  },
  host: 'localhost:5002',
  schemes: ['http'],
>>>>>>> 4e04c6c (Removed node_modules from repository)
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

<<<<<<< HEAD
swaggerAutogen(outputFile, endpointsFiles, doc);
=======
// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import('./index.js');
});
>>>>>>> 4e04c6c (Removed node_modules from repository)
