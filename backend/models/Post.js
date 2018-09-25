import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Reply = new Schema({
    content: {
        type: String
    },
    username: {
        type: String
    }
},
    {
        timestamps: true
    });
let Comment = new Schema({
    content: {
        type: String
    },
    username: {
        type: String
    },
    replies: {
        type: [Reply]
    }
},
    {
        timestamps: true
    });
let Post = new Schema({
    content: {
        type: String
    },
    username: {
        type: String
    },
    comments: {
        type: [Comment]
    }
},
    {
        timestamps: true
    });

export default mongoose.model('Post', Post);