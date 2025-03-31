require ('dotenv').config();

const express = require ('express');
const bodyParser = require ('body-parser');
const session = require ('express-session');
const mongodb = require('./data/database');
const cors = require ('cors');
const passport = require ('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());

