import { withRouter } from 'next/router'
import { Link } from '/routes'
import React, { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)

  let className = child.props.className || ''
  const href = props.route || props.href
  if (router.asPath === href) {
    className = `${className} active`
  }

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)
