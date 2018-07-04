import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'routes'
import map from 'lodash/map'
import toUpper from 'lodash/toUpper'
import Select from 'react-select'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { createAction } from 'redux-actions'
import { User } from 'constants/ActionTypes'
import BoxType from '/../shared/constants/BoxType'
import Input from 'reactstrap/lib/Input'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import AdminPageContainer from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import ColorButton from 'components/atoms/ColorButton'
import Rule from 'constants/Rule'

const SelectLabel = props => (
  <div>
    <span style={{}}>{props.left}</span>
    <span className="ml-5">{props.right}</span>
  </div>
)

const MyBigBtn = withStyles({ root: { fontSize: 16 } })(props => {
  return (
    <Button {...props} className={props.classes.root}>
      {props.children}
    </Button>
  )
})

const colourStyles = bgColor => {
  return {
    control: styles => ({
      ...styles,
      backgroundColor: bgColor,
      borderRadius: 0,
      margin: '0 auto',
      fontSize: 15,
      height: 50
    }),
    singleValue: styles => ({
      ...styles,
      color: 'white',
      width: '100%'
    }),
    placeholder: styles => ({
      ...styles,
      color: 'white'
    })
  }
}

const boxOptions = map(BoxType.index, (v, k) => {
  return {
    value: v,
    label: <SelectLabel left="投稿先　：" right={toUpper(k)} />
  }
})

const categoryOptions = [
  { value: 'talk', label: <SelectLabel left="カテゴリ：" right="AAAAA" /> },
  { value: 'voice', label: <SelectLabel left="カテゴリ：" right="AAAAA" /> },
  { value: 'news', label: <SelectLabel left="カテゴリ：" right="AAAAA" /> }
]

class AdminPostAdd extends React.Component {
  static async getInitialProps({ ctx }) {
    return { boxType: +ctx.query.boxType }
  }

  state = {
    title: '',
    body: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item">投稿</li>
        </WhiteBreadcrumb>

        <AdminPageContainer>
          <header className="borderB">
            <nav className="navbar justify-content-between">
              <Link route={'/admin/post/list'}>
                <MyBigBtn>キャンセル</MyBigBtn>
              </Link>
              <div className="">
                <MyBigBtn>下書きする</MyBigBtn>
                <MyBigBtn color="primary">投稿する</MyBigBtn>
              </div>
            </nav>
          </header>

          <section className="mt-3">
            <Select
              instanceId={'SSR-POSTADD001'}
              defaultValue={boxOptions[+props.boxType]}
              styles={colourStyles('#5e91c4')}
              options={boxOptions}
              isSearchable={false}
            />
            <Select
              instanceId={'SSR-POSTADD002'}
              defaultValue={categoryOptions[0]}
              styles={colourStyles('#2B6EB2')}
              options={categoryOptions}
              isSearchable={false}
            />
          </section>

          <section className="container mt-4">
            <TextField
              label="タイトル"
              value={this.state.title}
              onChange={this.handleChange('title')}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              fullWidth
            />
          </section>

          <section className="container mt-4">
            <TextField
              label="本文"
              value={this.state.body}
              onChange={this.handleChange('body')}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              fullWidth
              multiline
            />
          </section>
        </AdminPageContainer>

        <style global jsx>{`
          body {
            background-color: whitesmoke !important;
          }
        `}</style>

        <style jsx>{`
          .borderB {
            border-bottom: 1px solid gray;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // post: state.site.post
}))(AdminPostAdd)
