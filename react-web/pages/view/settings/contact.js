import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { Router } from 'routes'
import map from 'lodash/map'
import Select from 'react-select'
import { AppContact } from 'constants/ActionTypes'
import Input from '@material-ui/core/Input'
import ColorButton from 'components/atoms/ColorButton'
import BorderedTextHeader from 'components/organisms/site/BorderedTextHeader'
import Color from 'constants/Color'
import Rule from '/../shared/constants/Rule'

const contactOptions = map(Rule.CONTACT_TYPE, (v, k) => {
  const getLabel = v => {
    switch (v) {
      case Rule.CONTACT_TYPE.Default:
        return '選択してください...'
      case Rule.CONTACT_TYPE.System:
        return 'システム / アプリの使い方について'
      case Rule.CONTACT_TYPE.Contents:
        return 'コンテンツについて'
    }
  }
  return {
    value: v,
    label: getLabel(v)
  }
})

const colourStyles = bgColor => {
  return {
    control: styles => ({
      ...styles,
      // backgroundColor: bgColor,
      backgroundColor: '#fff',
      borderRadius: 0,
      margin: '0 auto',
      fontSize: '1rem',
      height: 50
    }),
    singleValue: styles => ({
      ...styles,
      // color: 'white',
      width: '100%'
    }),
    placeholder: styles => ({
      ...styles
      // color: 'white'
    })
  }
}

class Contact extends React.Component {
  constructor(props) {
    super(props)

    const state = {
      text: '',
      contactOption: contactOptions[0],
      errorMessage: ''
    }
    this.state = state
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onSubmit = () => {
    console.info('state', this.state)
    const { text, contactOption } = this.state

    const successCb = async res => {
      Router.pushRoute(`/view/home`)
    }
    this.props.dispatch(
      createAction(AppContact.SAVE_REQUEST)({
        successCb,
        type: contactOption.value,
        text
      })
    )
  }

  render() {
    const { text, contactOption } = this.state

    return (
      <React.Fragment>
        <BorderedTextHeader text="お問い合わせ" />

        <div className="container mb-3">
          <section className="mt-5">
            <label className="mb-2">お問い合わせ項目</label>
            <Select
              instanceId={'SSR-CONTACT001'}
              value={contactOption}
              onChange={o => this.setState({ contactOption: o })}
              styles={colourStyles('#5e91c4')}
              options={contactOptions}
              isSearchable={false}
            />
          </section>

          <section className="mt-5">
            <label className="mb-2">お問い合わせ内容</label>
            <Input
              placeholder="内容を入力してください"
              value={text}
              onChange={this.handleChange('text')}
              rows={5}
              rowsMax={50}
              fullWidth
              multiline
            />
          </section>

          <section className="mt-5 text-center">
            <ColorButton
              className="w-75"
              color={Color.MAIN_BLUE}
              disabled={contactOption.value === 0 || text.length === 0}
              onClick={this.onSubmit}
            >
              送信する
            </ColorButton>
          </section>
        </div>

        <style jsx>{`
          label {
            font-size: 12px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(Contact)
