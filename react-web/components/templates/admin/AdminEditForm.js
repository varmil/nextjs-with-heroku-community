import React from 'react'
import TallTextInput from 'components/atoms/TallTextInput'
import ProfileIconSelector from 'components/atoms/ProfileIconSelector'
import ColorButton from 'components/atoms/ColorButton'
import Color from 'constants/Color'
import AdminRegisterForm from 'components/templates/admin/AdminRegisterForm'
import Role from '/../shared/constants/Role'

const mbStyle = { marginBottom: 20 }

// 管理者アカウント編集
function HOC(WrappedComponent) {
  return class extends React.Component {
    state = {
      roleId: this.props.roleId,
      notification: {}
    }

    handleChange = name => event => {
      const { target } = event
      const value = target.type === 'checkbox' ? target.checked : target.value
      this.setState({ [name]: value })
    }

    onSave(state) {
      // merge state
      this.props.onSave({ ...state, ...this.state })
    }

    render() {
      const props = this.props
      const { roleId, notification } = this.state
      return (
        <React.Fragment>
          <WrappedComponent {...props} onSave={this.onSave.bind(this)}>
            <div className="form form-group px-5">
              <label>権限</label>

              <select
                className="custom-select form-control-lg mb-2"
                value={roleId}
                onChange={this.handleChange('roleId')}
                disabled={props.roleIdDisabled}
              >
                <option value={Role.User.ADMIN_GUEST}>
                  {Role.Name[Role.User.ADMIN_GUEST]}
                </option>
                <option value={Role.User.ADMIN_DEVELOPER}>
                  {Role.Name[Role.User.ADMIN_DEVELOPER]}
                </option>
                <option value={Role.User.ADMIN_SUPER}>
                  {Role.Name[Role.User.ADMIN_SUPER]}
                </option>
              </select>
            </div>
          </WrappedComponent>

          <style jsx>{`
            .header,
            label {
              font-weight: bold;
            }
          `}</style>
        </React.Fragment>
      )
    }
  }
}

const Foo = HOC(AdminRegisterForm)
export default Foo
