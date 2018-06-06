import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import AdminHeader from '../../components/organisms/AdminHeader'
import WhiteBreadcrumb from '../../components/organisms/WhiteBreadcrumb'

const initialState = {}

export default class Stepper extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    return (
      <div>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item active">サイトデザイン</li>
        </WhiteBreadcrumb>

        <div style={{ backgroundColor: 'whitesmoke' }}>
          <div className="container" style={{ paddingTop: 40 }}>
            hello world
          </div>

          <style jsx>{`
            .panel {
              padding: 30px;
              border: 3px #2b6db2 solid;
              border-radius: 20px;
            }

            button {
              padding: 10px 150px;
              background: #2b6db2;
            }
          `}</style>
        </div>
      </div>
    )
  }
}
