import React from 'react'
import { connect } from 'react-redux'
import { Link, Router } from 'routes'
import map from 'lodash/map'
import omit from 'lodash/omit'
import toUpper from 'lodash/toUpper'
import Select from 'react-select'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'
import BoxType from '/../shared/constants/BoxType'
import AdminPostFormLabel from 'components/atoms/AdminPostFormLabel'
import PostDropzone from 'components/molecules/PostDropzone'
import AdminPageContainer from 'components/molecules/AdminPageContainer'
import * as utilFiles from 'utils/files'

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

class AdminBaseEditor extends React.Component {
  constructor(props) {
    super(props)
    const { title, body, images } = this.props.post
    this.state = {
      category: this.createCatOptions()[0],
      title: title || '',
      body: body || '',
      files:
        (Array.isArray(images) &&
          images.map(src => {
            return { [utilFiles.FROM_SERVER_KEY]: true, preview: src }
          })) ||
        []
    }
  }

  createCatOptions() {
    const cats = this.props.categories
    if (!cats) return []
    return cats.map(cat => {
      return {
        value: cat.categoryIndex,
        label: <SelectLabel left="カテゴリ：" right={cat.text} />
      }
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  // stateまるごと通知
  onSubmit(released) {
    let data = this.state

    // カテゴリがあるBOXならば追加
    if (data.category) {
      data = { ...data, released, categoryIndex: this.state.category.value }
    }
    // category objectは不要なので省く
    data = omit(data, 'category')

    this.props.onSubmit(data)
  }

  render() {
    const props = this.props
    const categoryOptions = this.createCatOptions()

    return (
      <React.Fragment>
        <AdminPageContainer>
          <header className="borderB">
            <nav className="navbar justify-content-between">
              <Link route={'/admin/post/list'}>
                <MyBigBtn>キャンセル</MyBigBtn>
              </Link>
              <div className="">
                <MyBigBtn onClick={() => this.onSubmit(false)}>
                  下書きする
                </MyBigBtn>
                <MyBigBtn color="primary" onClick={() => this.onSubmit(true)}>
                  投稿する
                </MyBigBtn>
              </div>
            </nav>
          </header>

          <section className="mt-3">
            <Select
              instanceId={'SSR-POSTADD001'}
              value={boxOptions[+props.boxType]}
              onChange={o => {
                Router.replaceRoute(`/admin/post/add/${o.value}`)
              }}
              styles={colourStyles('#5e91c4')}
              options={boxOptions}
              isSearchable={false}
            />
          </section>

          {props.categories && (
            <section className="">
              <Select
                instanceId={'SSR-POSTADD002'}
                value={this.state.category}
                onChange={o => {
                  this.setState({ ...this.state, category: o })
                }}
                styles={colourStyles('#2B6EB2')}
                options={categoryOptions}
                isSearchable={false}
              />
            </section>
          )}

          <section className="container mt-4">
            <AdminPostFormLabel>タイトル</AdminPostFormLabel>
            <Input
              value={this.state.title}
              onChange={this.handleChange('title')}
              fullWidth
            />
          </section>

          <section className="container mt-4">
            <AdminPostFormLabel>本文</AdminPostFormLabel>
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
