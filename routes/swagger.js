<<<<<<< HEAD
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
=======
import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const router = express.Router();

const swaggerFilePath = path.resolve("swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));


router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

export default router;
>>>>>>> 4e04c6c (Removed node_modules from repository)
