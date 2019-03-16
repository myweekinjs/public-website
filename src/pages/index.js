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
