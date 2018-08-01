import React from 'react'
import TallTextInput from 'components/atoms/TallTextInput'
import ProfileIconSelector from 'components/atoms/ProfileIconSelector'
import ColorButton from 'components/atoms/ColorButton'
import Color from 'constants/Color'
import AdminRegisterForm from 'components/templates/admin/AdminRegisterForm'

const mbStyle = { marginBottom: 20 }

// 管理者アカウント編集
function iiHOC(WrappedComponent) {
  return class extends React.Component {
    state = {
      roleId: undefined,
      notification: {}
    }

    onSave(state) {
      console.info('state', state)

      // merge state

      this.props.onSave({})
    }

    render() {
      return (
        <React.Fragment>
          <WrappedComponent onSave={this.onSave.bind(this)}>
            <div>HELLO</div>
          </WrappedComponent>
        </React.Fragment>
      )
    }
  }
}

const Foo = iiHOC(AdminRegisterForm)
export default Foo
