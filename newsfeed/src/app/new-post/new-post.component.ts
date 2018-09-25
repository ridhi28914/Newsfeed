import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private postService: PostService) { }

  Post = { content: null, username: "ridhi", comments: [] };

  ngOnInit() {
  }

  onSubmit() {
    if (!this.Post.content)
      return;
    this.postService.addPost(this.Post).subscribe(
      (res) => console.log(res.post),
      (err) => console.log(err)
    );
  }

}
