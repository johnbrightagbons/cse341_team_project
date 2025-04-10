const express = require("express");
const routers = require("./routes/index.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");
const options = require("./swagger.json");
const specs = swaggerDoc(options);

const app = express();
app.use(express.json());
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", routers);

app.listen(8080, () => {
  console.log("server started and listening at port 8080");
});
