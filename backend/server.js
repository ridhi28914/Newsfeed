// ./express-server/app.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';
import bb from 'express-busboy';
import http from 'http';
import socket from 'socket.io';

// import routes
import postRoutes from './routes/post.server.route';

//import controller file
import * as postController from './controllers/post.server.controller';

// define our app using express
const app = express();

const server = http.Server(app);
const io = socket(server);

// express-busboy to parse multipart/form-data
bb.extend(app);

// socket.io connection
io.on('connection', (socket) => {

    console.log("Connected to Socket!!" + socket.id);

    // Receiving Posts from client
    socket.on('addPost', (Post) => {
        console.log('socketData: ' + JSON.stringify(Post));
        postController.addPost(io, Post);
    });

    // Receiving Updated Post from client
    socket.on('updatePost', (Post, comment) => {
        console.log('socketData: ' + JSON.stringify(Post));
        postController.updatePost(io, Post, comment);
    });

    // Receiving Updated Todo from client
    socket.on('updateComment', (Post, comment, reply) => {
        console.log('socketData: ' + JSON.stringify(Post));
        postController.updateComment(io, Post, comment, reply);
    });

    setInterval(postController.sendAge, 600000, io);
})

// allow-cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// set the port
const port = 4000;

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/posts');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

// add Source Map Support
SourceMapSupport.install();

app.use('/api', postRoutes);

app.get('/', (req, res) => {
    return res.end('Api working');
});

// catch 404
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});


// start the server
server.listen(port, () => {
    console.log(`App Server Listening at 4000`);
});
