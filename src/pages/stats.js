import React, { useState, useEffect } from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Firebase from '../firebase'
import { Link } from 'gatsby'
import Coffee from '../components/Coffee'
import Loading from '../components/Loading'

const StatsPage = () => {
  const [loading, setLoading] = useState(true)
  const [coffees, setCoffees] = useState(null)

  if (typeof window !== 'undefined') {
    const firebase = new Firebase()
    const coffeeRef = firebase.database.ref('/coffee')

    useEffect(() => {
      function updateWithSnapshot(snapshot) {
        setCoffees(snapshot.val())
        setLoading(false)
      }
  
      coffeeRef.on('value', (snap) => updateWithSnapshot(snap))
      
      return () => {
        coffeeRef.off()
      }
    }, [])
  }

  return (
    <Layout>
      <SEO title="Stats" keywords={[`gatsby`, `application`, `react`, `firebase`, `statistics`]} />
      <h1>Stats</h1>
      <blockquote>
        <p>Read related article: <Link to="/actions-with-google">Google actions in Actions</Link></p>
      </blockquote>
      {
        loading ? (
          <Loading />
        ) : (
          <Coffee coffees={coffees === null ? 0 : coffees} />
        )
      }
    </Layout>
  )
}

export default StatsPage
