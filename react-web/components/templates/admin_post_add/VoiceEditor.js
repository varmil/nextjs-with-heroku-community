import React from 'react'
import range from 'lodash/range'
import isNil from 'lodash/isNil'
// import { connect } from 'react-redux'
// import fecha from 'fecha'
// import Input from '@material-ui/core/Input'
import Rule from '/../shared/constants/Rule'
import immutable from 'object-path-immutable'
import AdminPostFormLabel from 'components/atoms/AdminPostFormLabel'
import BaseEditor from 'components/templates/admin_post_add/BaseEditor'

export default class extends React.Component {
  constructor(props) {
    super(props)
    const { Voice } = this.props.post
    this.state = {
      options: (Voice && Voice.options) || []
      // deadline:
      //   (Voice && Voice.deadline) ||
      //   fecha.format(new Date(), 'YYYY-MM-DDThh:mm')
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleChangeOptions(e, i) {
    const newState = immutable.set(this.state, `options.${i}`, e.target.value)
    this.setState(newState)
  }

  // baseStateとvoiceStateをmerge
  onSubmit(state) {
    const options = this.state.options.filter(e => e)
    this.props.onSubmit({ ...state, ...this.state, options }, () => {})
  }

  render() {
    const { options } = this.state
    const props = this.props
    return (
      <React.Fragment>
        <BaseEditor {...props} onSubmit={this.onSubmit.bind(this)}>
          <section className="container mt-5">
            <AdminPostFormLabel>選択肢</AdminPostFormLabel>
            <div className="options mx-auto mt-4">
              {range(Rule.MAX_OPTIONS).map(i => (
                <React.Fragment key={i}>
                  <div className="form-group row mb-0">
                    <label className="col-1 col-form-label">{i + 1}.</label>
                    <div className="col-10">
                      <input
                        type="text"
                        className="form-control"
                        value={options[i] || ''}
                        onChange={e => {
                          // 最大文字数を超えてる場合はそもそも発火しない
                          if (e.target.value.length > Rule.OPTION_MAX_LENGTH) {
                            return
                          }
                          this.handleChangeOptions(e, i)
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-right mb-3 mr-4">
                    {isNil(options[i]) ? '0' : `${options[i].length}`} /{' '}
                    {Rule.OPTION_MAX_LENGTH}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* <section className="container my-5">
            <AdminPostFormLabel>期限</AdminPostFormLabel>
            <div className="dead mx-auto text-center">
              <Input
                type="datetime-local"
                value={state.deadline}
                onChange={this.handleChange('deadline')}
              />
            </div>
          </section> */}
        </BaseEditor>

        <style jsx>{`
          .options {
            max-width: 500px;
            width: 85%;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
