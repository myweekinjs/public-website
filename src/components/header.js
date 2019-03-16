import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, ishome }) => (
  <header className={`container ${ ishome ? 'ishome' : '' }`}>
    <div>
      <h1>
        <Link to="/">#myweekinjs</Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
