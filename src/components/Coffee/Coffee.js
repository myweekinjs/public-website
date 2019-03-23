import React from 'react'
import './coffee.scss'

const CoffeeEmoji = () => {
  return (
    <span className="emoji" role="img" aria-label="coffee emoji">☕️</span>
  )
}

const Coffee = ({ coffees }) => {
  const renderTotalCoffees = (coffees) => {
    return Object.keys(coffees).reduce((acc, cur) => ( acc + coffees[cur].coffee ), 0)
  }

  const renderTodayTotal = () => {
    const today = new Date().toDateString();
    const todayCoffees = Object.keys(coffees).filter((key) => {
      let timestamp = new Date(coffees[key].timestamp).toDateString()
      return timestamp === today
    }).map((key) => coffees[key])

    return renderTotalCoffees(todayCoffees)
  }

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
