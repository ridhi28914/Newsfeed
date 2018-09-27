import Post from '../models/Post';
var DateDiff = require('date-diff');
var postMap = {};
export const calculateAge = () => {
    Post.find({}, function (err, posts) {
        postMap = {};
        posts.forEach(function (post) {

            let date1 = new Date(post.createdAt);
            let date2 = Date.now();
            let diff = new DateDiff(date2, date1);
            let post_age = "0 Minutes Ago";
            if (Math.floor(diff.days()) > 0)
                post_age = Math.floor(diff.days()).toString() + " Days Ago";

            else if (Math.floor(diff.hours()) > 0)
                post_age = Math.floor(diff.hours()).toString() + " Hours Ago";

            else if (Math.floor(diff.minutes()) > 0)
                post_age = Math.floor(diff.minutes()).toString() + " Minutes Ago";

            postMap[post._id] = post_age;
        });
    });
}

export const getPosts = (req, res) => {
    Post.find().exec((err, posts) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some error', 'error': err });
        }
        calculateAge();
        return res.json({ 'success': true, 'message': 'Posts fetched successfully', postMap, posts });
    });
}

export const addPost = (io, P) => {
    let result;
    const newPost = new Post(P);
    newPost.save((err, post) => {
        if (err) {
            result = { 'success': false, 'message': 'Some Error', 'error': err };
        }
        else {
            const result = { 'success': true, 'message': 'Todo Added Successfully', post }
            io.emit('PostAdded', result);
        }
    })
}

export const updatePost = (io, P, comment) => {
    let result;

    Post.findById(P._id, (err, post) => {
        if (!post)
            return next(new Error('Could not find Post'));
        else {
            post.comments.push(comment)
            post.save().then(post => {
                result = { 'success': true, 'message': 'Post Updated Successfully', post };
                io.emit('PostUpdated', result);
            }).catch(err => {
                result = { 'success': false, 'message': 'Some Error', 'error': err };
            });
        }
    });
}

export const updateComment = (io, P, comment, reply) => {
    let result;

    Post.findById(P._id, (err, post) => {
        if (!post)
            return next(new Error('Could not find Post'));
        else {
            post.comments.find(obj => {
                return obj._id == comment._id
            }).replies.push(reply)

            post.save().then(post => {
                result = { 'success': true, 'message': 'Post Updated Successfully', post };
                io.emit('PostUpdated', result);
            }).catch(err => {
                result = { 'success': false, 'message': 'Some Error', 'error': err };
            });
        }
    });
}

export const sendAge = (io) => {
    Post.find({}, function (err, posts) {
        calculateAge();
        console.log(postMap);
        io.emit('PostAgeUpdated', postMap);
    });
}
