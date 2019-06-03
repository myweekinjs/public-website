import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

import BlogPostCard from '../components/BlogPostCard'

const IndexPage = (props) => {
  const { data, uri } = props
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout ishome={ uri === '/' ? true : false }>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="welcome-message">
        <p><span role="img" aria-label="waving hand">👋</span> Hello everyone. Welcome to #myweekinjs! This is a personal challenge to build or learn something new in JavaScript each week (Ignore the month gap 😬).</p>
      </div>
      <div className="personal-links">
        <a href="https://github.com/HurricaneInteractive" target="_blank" rel="noopener noreferrer" className="btn">Github</a>
        <a href="https://dev.to/hurricaneinteractive" target="_blank" rel="noopener noreferrer" className="btn">Dev.to</a>
      </div>
      <div className="blog-posts">
        {
          posts.filter(post => post.node.frontmatter.title.length > 0).map(({ node: post }) => (
            <BlogPostCard {...post} key={post.id} />
          ))
        }
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 150)
          id
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
