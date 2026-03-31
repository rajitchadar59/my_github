const express = require('express');
const path = require('path'); 
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { initRepo } = require('./controllers/init');
const { addRepo } = require('./controllers/add');
const { commitRepo } = require('./controllers/commit');
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");
const mainRouter = require('./routes/main.router');





const { Server } = require('socket.io');

dotenv.config();

yargs(hideBin(process.argv))
    .command('start', "starts a new server", {}, startServer)
    .command('init', "Initialize a new repository", {}, initRepo)
    .command('add <file>', "Add a file to the repository", (yargs) => {
        yargs.positional("file", {
            describe: "File to add to the staging area",
            type: "string"
        })

    }, (argv) => {
        addRepo(argv.file);
    })
    .command(
        "commit <message>",
        "Commit the staged files",
        (yargs) => {
            yargs.positional("message", {
                describe: "Commit message",
                type: "string",
            });
        }, (argv) => {
            commitRepo(argv.message);
        })
    .command("push", "Push commits to S3", {}, pushRepo)
    .command("pull", "Pull commits from S3", {}, pullRepo)
    .command(
        "revert <commitID>",
        "Revert to a specific commit",
        (yargs) => {
            yargs.positional("commitID", {
                describe: "Comit ID to revert to",
                type: "string",
            });
        }, (argv) => {
            revertRepo(argv.commitID);
        })
    .demandCommand(1, "you need atleast one command")
    .help().argv;


function startServer() {


    const app = express();
    const port = process.env.PORT || 3000;

    app.use(bodyParser.json());
    app.use(express.json());

    app.use(express.static(path.join(__dirname, 'dist')));

    const mongoURI = process.env.MONGO_URI;

    mongoose.connect(mongoURI).then(() => {
        console.log('MongoDB connected !');
    }).catch((err) => console.error("Unable to connect : ", err));

    app.use(cors({ origin: "*" }));

    app.use("/", mainRouter);

    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });

    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    })

}






