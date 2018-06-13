import React from 'react'
import AdminHeader from 'components/organisms/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/WhiteBreadcrumb'
import SideBar from 'components/templates/site/edit/SideBar'
import TopPage from 'components/templates/site/edit/TopPage'

import { connect } from 'react-redux'
// import { loadData } from 'actions/example'

const initialState = {}
const SIDEBAR_WIDTH = 180
const OFFSET_TOP_SIDEBAR = 106
const OFFSET_TOP_MAINBODY = 135

class Edit extends React.Component {
  // TODO: this is example code
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx

    // if (!store.getState().placeholderData) {
    //   console.info('data is empty, so fetch data')
    //   store.dispatch(loadData())
    // }

    return { isServer /* site: store.getState().site */ }
  }

  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    const props = this.props
    console.info(props)
    return (
      <div className="container-fluid">
        <div className="fixed-top">
          <AdminHeader />

          <WhiteBreadcrumb>
            <li className="breadcrumb-item">サイトデザイン</li>
            <li className="breadcrumb-item active">ホーム</li>
          </WhiteBreadcrumb>
        </div>

        <div className="mainBody">
          <SideBar width={SIDEBAR_WIDTH} offsetTop={OFFSET_TOP_SIDEBAR} />
          <TopPage
            {...props}
            style={{
              marginTop: OFFSET_TOP_MAINBODY,
              marginLeft: SIDEBAR_WIDTH,
              marginBottom: 20,
              backgroundColor: 'white',
              minHeight: 900,
              boxShadow: '3px 0px 20px black'
            }}
          />
        </div>

        <style global jsx>{`
          body {
            background-color: whitesmoke !important;
          }
        `}</style>

        <style jsx>{`
          button {
            padding: 10px 150px;
            background: #2b6db2;
          }
        `}</style>
      </div>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  top: state.site.top
}))(Edit)
