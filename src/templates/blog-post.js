import React from 'react'
import Layout from '../components/layout'
import SEO from "../components/seo"
import { graphql } from 'gatsby';
import Resource from '../components/Resource'

const Template = ({
  data
}) => {
  const { markdownRemark: post } = data
  const { frontmatter: {
    keywords,
    resources
  } } = post
  
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        keywords={keywords ? keywords.split(',') : []}
      />
      <h1>{post.frontmatter.title}</h1>
      <ul className="meta">
        <li>{post.frontmatter.date}</li>
        <li>{post.timeToRead} min read</li>
      </ul>
      <div className="blog-content-wrapper">
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        {
          resources ? (
            <div className="resource-wrapper">
              <h3>Related Resources</h3>
              <div className="resource-list">
                {
                  resources.map((resource, i) => (
                    <Resource resource={resource} key={i} />
                  ))
                }
              </div>
            </div>
          ) : (
            false
          )
        }
      </div>
    </Layout>
  )
}

export default Template

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      excerpt(pruneLength: 150)
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        keywords
        resources
      }
    }
  }
`
