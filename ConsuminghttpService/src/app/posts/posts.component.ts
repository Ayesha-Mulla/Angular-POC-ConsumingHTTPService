import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private service: PostService) {

  }
  ngOnInit() {
    this.service.getPost()
      .subscribe(response => {
        this.posts = response.json();
      });
  }

  createPost(inputData: HTMLInputElement) {
    const post = { title: inputData.value };
    inputData.value = '';
    this.service.createPost(post)
      .subscribe(response => {
        post['id'] = response.json().id;
        this.posts.splice(0, 0, post);
      });
  }
  updatePost(post) {
    this.service.updatePost(post)
      .subscribe(response => {
        alert(response.json().isRead);
      });
  }
  deletePost(post) {
    this.service.deletePost(post.id)
      .subscribe(response => {
        this.posts.splice(this.posts.indexOf(post), 1);
      });
  }


}
