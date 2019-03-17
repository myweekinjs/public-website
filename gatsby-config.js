module.exports = {
  siteMetadata: {
    title: `#myweekinjs`,
    description: `Personal blog of a Web Developer with a passion for writing pointless apps in JavaScript. This is what he played with this week.`,
    author: `@hurricane_int`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `myweekinjs`,
        short_name: `myweekinjs`,
        start_url: `/`,
        background_color: `#03CEA4`,
        theme_color: `#03CEA4`,
        display: `minimal-ui`,
        icon: `src/images/js-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-"
            }
          }
        ]
      }
    },
    `gatsby-plugin-sass`
  ],
}
