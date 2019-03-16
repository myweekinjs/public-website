import React from 'react'
import Layout from '../components/layout'
import SEO from "../components/seo"
import { graphql } from 'gatsby';

const Template = ({
  data
}) => {
  const { markdownRemark: post } = data
  
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <h1>{post.frontmatter.title}</h1>
      <ul className="meta">
        <li>{post.frontmatter.date}</li>
        <li>{post.timeToRead} min read</li>
      </ul>
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export default Template

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
