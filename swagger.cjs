// collect info about the swagger file
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import express from "express";
import Router from "./routes/index.js";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerFile = path.join(__dirname, "swagger.json");
const swaggerData = fs.readFileSync(swaggerFile, "utf8");
const swaggerDefinition = JSON.parse(swaggerData);
const options = {
  swaggerDefinition,
  apis: ["./routes/index.js", "./controllers/*.js"],
};
const specs = swaggerJSDoc(options);
app.use("/api-docs/", serve, setup(specs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", Router);
app.listen(8080, () => {
  console.log("server started and listening at port 8080");
});
