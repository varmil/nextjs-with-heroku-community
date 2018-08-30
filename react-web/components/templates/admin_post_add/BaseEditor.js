import React from 'react'
import { connect } from 'react-redux'
import { Router } from 'routes'
import map from 'lodash/map'
import omit from 'lodash/omit'
import find from 'lodash/find'
import Select from 'react-select'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'
import AdminPostFormLabel from 'components/atoms/AdminPostFormLabel'
import PostDropzone from 'components/molecules/PostDropzone'
import { Container } from 'components/molecules/AdminPageContainer'
import * as utilFiles from 'utils/files'
import Rule from '/../shared/constants/Rule'

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
        [],

      submitting: false
    }
  }

  createBoxOptions = () => {
    return map(this.props.boxes, (v, i) => {
      return {
        value: v.type,
        label: <SelectLabel left="投稿先　：" right={v.header.text} />
      }
    })
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

  handleChange = (name, maxLength = 0) => event => {
    if (maxLength && event.target.value.length > maxLength) {
      return
    }

    this.setState({
      [name]: event.target.value
    })
  }

  // stateまるごと通知
  onSubmit(released) {
    // avoid double submitting
    if (this.state.submitting) return
    this.setState({ submitting: true })

    // 下書き情報追加
    let data = this.state
    data = { ...data, released }
    // カテゴリがあるBOXならば追加
    if (data.category) {
      data = { ...data, released, categoryIndex: this.state.category.value }
    }
    // category や submittingは不要なので省く
    data = omit(data, 'category', 'submitting')

    this.props.onSubmit(data, () => this.setState({ submitting: false }))
  }

  render() {
    const props = this.props
    const categoryOptions = this.createCatOptions()
    const boxOptions = this.createBoxOptions()

    return (
      <React.Fragment>
        <Container>
          <header className="borderB">
            <nav className="navbar justify-content-between">
              <MyBigBtn
                onClick={() => {
                  if (props.back) {
                    Router.back()
                  } else {
                    Router.pushRoute('/admin/post/list')
                  }
                }}
              >
                キャンセル
              </MyBigBtn>
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
              value={find(boxOptions, e => e.value === +props.boxType)}
              onChange={o => {
                Router.replaceRoute(
                  `/admin/post/add/${o.value}${location.search}`
                )
              }}
              styles={colourStyles('#5e91c4')}
              options={boxOptions}
              isSearchable={false}
            />
          </section>

          {props.categories && (
            <section>
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
              onChange={this.handleChange('title', Rule.TITLE_MAX_LENGTH)}
              fullWidth
            />
          </section>

          <section className="container mt-4">
            <AdminPostFormLabel>本文</AdminPostFormLabel>
            <Input
              value={this.state.body}
              onChange={this.handleChange('body', Rule.POST_MAX_LENGTH)}
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
        </Container>

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
            max-width: 375px;
            width: 85%;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  // post: state.site.post
}))(AdminBaseEditor)
