import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'routes'
import map from 'lodash/map'
import toUpper from 'lodash/toUpper'
import Select from 'react-select'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'
import BoxType from '/../shared/constants/BoxType'
import PostDropzone from 'components/molecules/PostDropzone'
import AdminPageContainer from 'components/molecules/AdminPageContainer'

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
      fontSize: '1rem',
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

const createCatOptions = cats => {
  if (!cats) return []
  return cats.map(cat => {
    return {
      value: cat.categoryIndex,
      label: <SelectLabel left="カテゴリ：" right={cat.text} />
    }
  })
}

class AdminBaseEditor extends React.Component {
  static async getInitialProps({ ctx }) {
    return { boxType: +ctx.query.boxType }
  }

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

  render() {
    const props = this.props
    const categoryOptions = createCatOptions(props.categories)

    return (
      <React.Fragment>
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
          </section>

          {props.categories && (
            <section className="">
              <Select
                instanceId={'SSR-POSTADD002'}
                defaultValue={categoryOptions[0]}
                styles={colourStyles('#2B6EB2')}
                options={categoryOptions}
                isSearchable={false}
              />
            </section>
          )}

          <section className="container mt-4">
            <label>タイトル</label>
            <Input
              value={this.state.title}
              onChange={this.handleChange('title')}
              fullWidth
            />
          </section>

          <section className="container mt-4">
            <label>本文</label>
            <Input
              value={this.state.body}
              onChange={this.handleChange('body')}
              rows={5}
              rowsMax={50}
              fullWidth
              multiline
            />
          </section>

          <section className="images mx-auto mt-3">
            <PostDropzone
              size={45}
              files={this.state.files}
              onChange={files => this.setState({ ...this.state, files })}
            />
          </section>

          {props.children}
        </AdminPageContainer>

        <style global jsx>{`
          body {
            background-color: whitesmoke !important;
          }
        `}</style>

        <style jsx>{`
          label {
            color: #707070;
          }

          .borderB {
            border-bottom: 1px solid gray;
          }

          .images {
            width: 375px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // post: state.site.post
}))(AdminBaseEditor)
