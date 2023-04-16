import http from "http";
import AppLogger from './core/eventLogger';
import app from "./app";
import sequelize from "./config/database";
import 'reflect-metadata';

let logger = new AppLogger();
let scope = 'index.ts';
const port = 3001

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
    
const server = http.createServer({}, app);

server.listen(port, () => {
    logger.logInfo(scope, `Server started on port ${port}`);

}).on("error", (e) =>
    logger.logWarn(scope, e.toString())
);;