import React from 'react'
import {decode} from 'html-entities'

const truncateText = (text,limit) =>{
    const shortened = text.indexOf(' ',limit);
    if(shortened===-1) return text
    return text.substring(0,shortened);
}

function DisplayResult({results}) {
    return(
        <div className="container card-columns">
          {
            results.length ?
            results.map((post,index) =>
                    <div className="card mb-2" key={index}>
                        <img className="card-img-top" src={post.preview ? decode(post.preview.images[0].source.url) : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'} alt="preview"/>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{truncateText(post.selftext,100)}</p>
                            <a href={post.url} className="btn btn-primary">Read More</a>
                            <hr/>
                            <span className="badge badge-secondary">Subreddit: {post.subreddit}</span>
                            <span className="badge badge-dark">Score: {post.score}</span>
                        </div>
                    </div>
            ) : null
          }
        </div>
    )
}

export default DisplayResult



