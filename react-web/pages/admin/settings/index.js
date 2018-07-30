import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Header,
  Filter
} from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import FanTable from 'components/organisms/admin/FanTable'

const Item = props => (
  <div className="list-group-item list-group-item-action py-4">
    <div className="row">
      <div className="col-1" />
      <div className=" col-9">{props.text}</div>
      <div className="col-2">
        <i className="fas fa-chevron-right" />
      </div>
    </div>

    <style jsx>{`
      .list-group-item {
        border: none !important;
      }

      .row {
        font-size: 16px;
        font-weight: bold;
      }
    `}</style>
  </div>
)

class AdminSettings extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item active">アカウント設定</li>
        </WhiteBreadcrumb>

        <Container>
          <section className="wrap list-group py-0 px-4">
            <Item text="管理者情報" />
            <hr className="w-100 my-1" />
            <Item text="お支払い情報" />
          </section>
        </Container>

        <style global jsx>{`
          body {
            background-color: whitesmoke !important;
          }
        `}</style>

        <style jsx>{`
          hr {
            border-top: 1px solid #707070;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect()(AdminSettings)
