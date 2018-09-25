import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class PostService {

  ApiUrl: string;

  constructor(private http: HttpClient) {
    this.ApiUrl = environment.apiUrl + 'posts';
  }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.ApiUrl, {});
  }
  addPost(Post): Observable<any> {
    return this.http.post<any>(this.ApiUrl + '/add', Post);
  }

}
