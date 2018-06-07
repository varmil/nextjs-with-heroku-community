import React from 'react'
import AdminHeader from '../../../components/organisms/AdminHeader'
import WhiteBreadcrumb from '../../../components/organisms/WhiteBreadcrumb'
import SideBar from '../../../components/templates/edit/SideBar'
import TopPage from '../../../components/templates/edit/TopPage'

const initialState = {}

export default class Stepper extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
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
          <SideBar width={180} offsetTop={145} />
          <TopPage
            style={{
              marginTop: 145,
              marginLeft: 180,
              backgroundColor: 'white',
              minHeight: 500
            }}
          />
        </div>

        <style global jsx>{`
          body {
            background-color: whitesmoke;
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
