import React from 'react'
import { Link } from '/routes'
import { connect } from 'react-redux'
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'

import DropzoneIcon from 'components/atoms/Dropzone'
import Rule from 'constants/Rule'
// import BoxContent from 'components/organisms/site/BoxContent'
// import { createAction } from 'redux-actions'
// import { SitePost } from 'constants/ActionTypes'

const inputStyles = {
  input: {
    padding: '10px'
  }
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'gray',
    // border: 'none',
    borderRadius: 0,
    margin: '0 auto',
    fontSize: 12
  }),
  singleValue: styles => ({
    ...styles,
    color: 'white'
  }),
  placeholder: styles => ({
    ...styles,
    color: 'white'
  })
}

class Editpost extends React.Component {
  // static async getInitialProps({ ctx }) {
  //   const { dispatch } = ctx.store
  //   dispatch(createAction(SitePost.FETCH_REQUEST)(ctx.query))
  //   return {}
  // }

  state = {
    title: '',
    body: '',
    files: []
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onDrop(files) {
    let newFiles = this.state.files.concat(files)
    if (newFiles.length > Rule.MAX_UPLOAD_FILES) {
      newFiles = newFiles.slice(0, Rule.MAX_UPLOAD_FILES)
    }
    this.setState({ ...this.state, files: newFiles })
  }

  onDelete(e, tappedFile) {
    e.preventDefault()
    e.stopPropagation()
    // Remove tappedItem from state.files
    const filtered = this.state.files.filter(
      f => f.preview !== tappedFile.preview
    )
    this.setState({ ...this.state, files: filtered })
  }

  render() {
    const state = this.state
    const props = this.props
    const { classes } = props

    return (
      <React.Fragment>
        <header>
          <nav className="navbar justify-content-between">
            <Link route={'/view/home'}>
              <span style={{ color: 'black' }}>キャンセル</span>
            </Link>
            <div className="">
              <button className="btn btn-link my-2 my-sm-0" type="submit">
                投稿する
              </button>
            </div>
          </nav>
        </header>

        <Select
          instanceId={'SSR-GOGO001'}
          placeholder={'カテゴリ'}
          styles={colourStyles}
          options={options}
          isSearchable={false}
        />

        <section className="mt-3">
          <Input
            className={classes.input}
            placeholder="タイトル"
            value={this.state.title}
            onChange={this.handleChange('title')}
            fullWidth
          />
        </section>

        <section className="mt-3">
          <Input
            className={classes.input}
            placeholder="本文"
            value={this.state.body}
            onChange={this.handleChange('body')}
            fullWidth
            multiline
          />
        </section>

        <section>
          <DropzoneIcon
            files={state.files}
            onDrop={this.onDrop.bind(this)}
            onDelete={this.onDelete.bind(this)}
          />
        </section>
      </React.Fragment>
    )
  }
}

const Styled = withStyles(inputStyles)(Editpost)
export default connect(state => ({
  // post: state.site.post
}))(Styled)
