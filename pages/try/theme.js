import React from 'react'
import AdminRegisterForm from '../../components/organisms/AdminHeader'

const initialState = {}

export default class Stepper extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    return (
      <div>
        <AdminRegisterForm />

        <div className="container" style={{ marginTop: 40 }}>
          hello world
        </div>

        <style global jsx>{`
          .rc-steps-horizontal:not(.rc-steps-label-vertical)
            .rc-steps-item-description {
            max-width: 120px !important;
          }
        `}</style>
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
    )
  }
}
