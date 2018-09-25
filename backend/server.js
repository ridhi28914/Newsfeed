import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Post from './models/Post';
import http from 'http';
import socket from 'socket.io';

const app = express();
const router = express.Router();

//app setup
app.use(cors());
// app.options('*', cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let server = require('http').createServer(app);

//mongoose setup
mongoose.connect('mongodb://localhost:27017/posts');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

let io = require('socket.io')(server);
io.on('connection', function (client) {

    console.log('user connected');

    client.on('disconnect', function () {
        console.log("user disconnected")
    });

    client.on('room', function (data) {
        client.join(data.roomId);
        console.log(' Client joined the room and client id is ' + client.id);

    });

    client.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', { type: 'new-message', text: message });
    });

    client.on('toBackEnd', function (data) {
        client.in(data.roomId).emit('message', data);
    })
});


router.route('/').get((req, res) => {
    return res.json("h");
});
router.route('/posts').get((req, res) => {
    Post.find((err, posts) => {
        if (err)
            console.log(err);
        else
            res.json(posts);
    });
});

router.route('/posts/add').post((req, res) => {
    console.log(req.body);
    let post = new Post(req.body);
    post.save()
        .then(post => {
            res.status(200).json({ 'post': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/posts/comment/:id').post((req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (!post)
            return next(new Error('Could not find Post'));
        else {
            post.comments.push(req.body.comment)
            post.save().then(post => {
                res.json('Comment added!');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/posts/reply/:id').post((req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (!post)
            return next(new Error('Could not find Post'));
        else {
            // console.log("post is" + post);
            post.comments.find(obj => {
                return obj._id == req.body.comment_id
            }).replies.push(req.body.reply)

            post.save().then(post => {
                res.json('reply added');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
