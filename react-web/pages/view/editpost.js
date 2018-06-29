import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'

// import BoxContent from 'components/organisms/site/BoxContent'
// import { createAction } from 'redux-actions'
// import { SitePost } from 'constants/ActionTypes'

const inputStyles = {
  // root: {
  //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //   borderRadius: 3,
  //   border: 0,
  //   color: 'white',
  //   height: 48,
  //   padding: '0 30px',
  //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  // },
  titleInput: {
    padding: '10px'
  },
  bodyInput: {
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
    name: '',
    multiline: 'Controlled'
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const props = this.props
    const { classes } = props

    return (
      <React.Fragment>
        <header>
          <nav className="navbar justify-content-between">
            <a className="">キャンセル</a>
            <div className="">
              <button className="btn btn-link my-2 my-sm-0" type="submit">
                投稿する
              </button>
            </div>
          </nav>
        </header>

        <Select
          placeholder={'カテゴリ'}
          styles={colourStyles}
          options={options}
          isSearchable={false}
        />

        <section className="mt-3">
          <Input
            classes={{ input: classes.titleInput }}
            placeholder="タイトル"
            value={this.state.name}
            onChange={this.handleChange('name')}
            fullWidth
          />
        </section>

        {/* <section className="mt-3">
          <Input
            classes={{ input: classes.bodyInput }}
            placeholder="本文"
            value={this.state.name}
            onChange={this.handleChange('name')}
            fullWidth
            multiline
          />
        </section> */}

        <style jsx>{`
          input {
            padding: 10px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

const Styled = withStyles(inputStyles)(Editpost)
export default connect(state => ({
  // post: state.site.post
}))(Styled)
