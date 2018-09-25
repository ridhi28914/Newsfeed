import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor(private postService: PostService) { }

  posts: any;
  displayComments = false;
  displayReplies = false;

  ngOnInit() {
    this.postService.getPosts().subscribe(
      (res) => {
        this.posts = res;
        this.posts.forEach(post => {
          post.open = false;
          post.comments.forEach(comment => {
            comment.open = false;
          });
        });
        console.log(res)
      },
      (err) => console.log(err)
    );
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
