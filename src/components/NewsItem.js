import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsUrl, author, date } = this.props;
    const formattedDate = date ? new Date(date).toUTCString() : "Date not available";

    return (
      <>
        <div className="card">
          <img src={imageurl} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">By {author || "Unknown"} on {formattedDate}</small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
