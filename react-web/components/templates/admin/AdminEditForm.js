import React from 'react'
import TallTextInput from 'components/atoms/TallTextInput'
import ProfileIconSelector from 'components/atoms/ProfileIconSelector'
import ColorButton from 'components/atoms/ColorButton'
import Color from 'constants/Color'
import AdminRegisterForm from 'components/templates/admin/AdminRegisterForm'

const mbStyle = { marginBottom: 20 }

// 管理者アカウント編集
function HOC(WrappedComponent) {
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
      const props = this.props
      return (
        <React.Fragment>
          <WrappedComponent {...props} onSave={this.onSave.bind(this)}>
            <div>HELLO</div>
          </WrappedComponent>
        </React.Fragment>
      )
    }
  }
}

const Foo = HOC(AdminRegisterForm)
export default Foo
