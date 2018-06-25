import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import CommonFooter from 'components/organisms/CommonFooter'

const initialState = {}

class Home extends React.Component {
  // ctx.query contains URL params
  static async getInitialProps({ ctx }) {
    console.log('query', ctx.query)
    return { query: ctx.query }
  }

  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    return <div>HELLO</div>
  }
}

export default withRouter(Home)
