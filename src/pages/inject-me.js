import React, { useState, useEffect } from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from 'gatsby'

const InjectMe = () => {
  const [loaded, setLoaded] = useState(false)
  const [timer, setTimer] = useState(false)

  useEffect(() => {
    startTimerInterval()

    return () => {
      clearTimerInterval()
    }
  }, [])

  const startTimerInterval = () => {
    setTimer(setTimeout(() => {
      setLoaded(true)
    }, 2000))
  }
  
  const clearTimerInterval = () => {
    clearTimeout(timer)
    setTimer(false)
  }

  return (
    <Layout>
      <SEO title="Inject me" />
      <h1>Inject your code below!</h1>
      <p>Some content will appear after 2 seconds, if you followed the chrome extension article, your component should appear in a second or two after.</p>
      <blockquote>
        <p>Read related article: <Link to="/chrome-extension-with-react">Creating a Chrome Extension with React</Link></p>
      </blockquote>
      <div id="target-test">
        { loaded ? <p>Content Has Loaded!</p> : false }
      </div>
    </Layout>
  )
}

export default InjectMe
