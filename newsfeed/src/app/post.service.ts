import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class PostService {

  ApiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  // getPosts(): Observable<any> {
  //   return this.http.get<any>(this.ApiUrl, {});
  // }

  getPosts(): Promise<any> {
    return this.http.get(this.ApiUrl)
      .toPromise()
      .then()
      .catch(this.handleError)
  }

  createPost(post: any, socket: any): void {
    socket.emit('addPost', post);
  }

  updatePost(post: any, comment: any, socket: any): void {
    socket.emit('updatePost', post, comment);
  }
  updateComment(post: any, comment: any, reply: any, socket: any): void {
    socket.emit('updateComment', post, comment, reply);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for development purposes only
    return Promise.reject(error.message || error);
  }

}
