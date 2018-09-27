import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import * as io from "socket.io-client";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor(private postService: PostService) { }

  posts: any = [];
  apiMessage: string;
  Post = { content: null, username: "ridhi", comments: [], age: "0 Minutes ago", newComment: { content: null, username: "ridhi", replies: [] } };
  Comment = { content: null, username: "ridhi", replies: [] };
  Reply = { content: null, username: "ridhi" };

  private url = 'http://localhost:4000';
  private socket;

  ngOnInit() {

    this.postService.getPosts()
      .then((pst) => {
        this.posts = pst.posts;

        this.posts.forEach(post => {
          post.open = false;
          post.age = pst.postMap[post._id];
          post.newComment = { content: null, username: "ridhi", replies: [] };
          post.comments.forEach(comment => {
            comment.open = false;
            comment.newReply = { content: null, username: "ridhi" };
          });
        });

      });

    this.socket = io.connect(this.url);

    // Receive Added Post
    this.socket.on('PostAdded', (data) => {
      console.log('PostAdded: ' + JSON.stringify(data));
      data.post.newComment = { content: null, username: "ridhi", replies: [] };
      this.posts.push(data.post);
    });

    //Receive Updated Post
    this.socket.on('PostUpdated', (data) => {

      data.post.comments.forEach(element => {
        element.newReply = { content: null, username: "ridhi" };
      });
      const updatedPosts = this.posts.map(t => {
        if (data.post._id !== t._id) {
          return t;
        }
        return { ...t, ...data.post };
      })
      this.apiMessage = data.message;
      this.posts = updatedPosts;
    });

    //Age Updated Post
    this.socket.on('PostAgeUpdated', (data) => {
      this.posts.forEach(post => {
        post.age = data[post._id]
      });
    });

  }

  onSubmit() {
    if (!this.Post.content)
      return;

    this.postService.createPost(this.Post, this.socket);
    this.Post.content = null;
  }
  onCommentSubmit(post) {
    this.postService.updatePost(post, post.newComment, this.socket);
    post.newComment.content = null;
  }
  onReplySubmit(post, comment) {
    this.postService.updateComment(post, comment, comment.newReply, this.socket);
    comment.newReply.content = null;
  }

  onCommentsClick(postfind) {
    let post = this.posts.find(function (post) {
      return post == postfind;
    });
    post.open = !(post.open);
  }
  onRepliesClick(commentfind, postfind) {

    let post = this.posts.find(function (post) {
      return post == postfind;
    });

    var comment = post.comments.find(function (comment) {
      return comment == commentfind;
    });
    comment.open = !(comment.open);
  }

}
