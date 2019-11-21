import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Post extends Component {
  render() {
    const posts = [1, 2, 3, 4, 5];
    return (
      <div>
        <h1>timeline</h1>
        <p>aaa</p>
        <ul>
          {posts.map((p, idx) => {
            return (
              <li key={idx}>
                <Link to={'/post/' + p}>{'post_id=' + p}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
