import express from 'express';
import router from './router/router.js';
import sequelize from './database/database.js';
import Character from './models/Character.js'; // for sequelize to sync with model
import chalk from 'chalk'; // cli cosmetic for dev logs readability
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/", router);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(chalk.cyan("Connection to database established"));

        await sequelize.sync();
        console.log(chalk.cyan("All models were synchronized"));
        
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(`Unable to start the server: ${chalk.red(error)}`);
    }
};

startServer();