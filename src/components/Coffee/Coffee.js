import React from 'react'
import './coffee.scss'

const CoffeeEmoji = () => {
  return (
    <span className="emoji" role="img" aria-label="coffee emoji">☕️</span>
  )
}

const Coffee = ({ coffees }) => {
  const renderTotalCoffees = (coffees) => {
    // Uses a reduce method to count up from 0 and add the current coffee value to the accumulator
    return Object.keys(coffees).reduce((acc, cur) => ( acc + coffees[cur].coffee ), 0)
  }

  const renderTodayTotal = () => {
    // Gets today date as a date string
    const today = new Date().toDateString();
    // Filter through all the coffee objects
    const todayCoffees = Object.keys(coffees).filter((key) => {
      // get the timestamp value as a date string
      let timestamp = new Date(coffees[key].timestamp).toDateString()
      // return key if it is today
      return timestamp === today
    })
    // Map through the filtered keys and return the coffee object
    .map((key) => coffees[key])

    // Return the total number of coffees for the current day
    return renderTotalCoffees(todayCoffees)
  }

  // Render a number of coffee cup emojis
  const renderCoffeeCups = (num) => {
    const cups = []
    for (let i = 0; i < num; i++) {
      cups.push(<CoffeeEmoji key={i} />)
    }

    return cups
  }

  return (
    <>
      <div className="coffee-data">
        <h3>Totals Total: { renderTodayTotal() }</h3>
        <div className="coffee-list">
          { renderCoffeeCups(renderTodayTotal()) }
        </div>
      </div>
      <div className="coffee-data">
        <h3>All time Total: { renderTotalCoffees(coffees) }</h3>
        <div className="coffee-list">
          { renderCoffeeCups(renderTotalCoffees(coffees)) }
        </div>
      </div>
    </>
  )
}

export default Coffee
