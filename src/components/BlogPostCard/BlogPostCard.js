import React from 'react'
import { Link } from 'gatsby'

import "./blog-post-card.scss"

const BlogPostCard = ({
  frontmatter: {
    title,
    date,
    path
  },
  excerpt,
  timeToRead
}) => {
  return (
    <Link className="blog-post-card" to={path}>
      <h3>{title}</h3>
      <ul className="meta">
        <li>{date}</li>
        <li>{timeToRead} min read</li>
      </ul>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
    </Link>
  )
}

export default BlogPostCard
