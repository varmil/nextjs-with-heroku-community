import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
import { AppAdminFan } from 'constants/ActionTypes'
import { Container, Header } from 'components/molecules/AdminPageContainer'
import AdminHeader from 'components/organisms/admin/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/admin/WhiteBreadcrumb'
import RoundWideButton from 'components/atoms/RoundWideButton'

const colourStyles = {
  container: styles => ({
    ...styles,
    // width: '80%',
    margin: '0 auto'
  }),
  control: styles => ({
    ...styles,
    // backgroundColor: 'white',
    // border: 'none',
    fontSize: 15
  })
}

class AdminFanInvite extends React.Component {
  static async getInitialProps({ ctx }) {
    const { dispatch } = ctx.store
    // one-start のページ番号
    const pageNum = +ctx.query.pageNum || 1
    // 1ページあたり記事数
    const PER_PAGE = 30

    dispatch(
      createAction(AppAdminFan.FETCH_LIST_REQUEST)({
        pageNum,
        perPage: PER_PAGE
      })
    )
    return { pageNum, perPage: PER_PAGE }
  }

  handleChange = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
  }

  handleInputChange = (inputValue, actionMeta) => {
    console.group('Input Changed')
    console.log(inputValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item">ファン</li>
          <li className="breadcrumb-item active">ファンの追加</li>
        </WhiteBreadcrumb>

        <Container>
          <Header
            title="招待リンク発行"
            route={null}
            buttonText="CSVインポート"
          />

          <section className="mt-3 mb-5 row justify-content-center">
            <div className="col-9">
              <label className="mb-4">メールアドレス</label>
              <CreatableSelect
                isMulti
                isClearable
                placeholder={'メールアドレスを入力'}
                onChange={this.handleChange.bind(this)}
                onInputChange={this.handleInputChange.bind(this)}
                styles={colourStyles}
              />
            </div>
            <div className="col-2">
              <RoundWideButton
                outline={false}
                containerStyle={{
                  position: 'relative',
                  top: 47
                }}
                style={{
                  paddingTop: 7,
                  paddingBottom: 7,
                  fontSize: 14
                }}
                color={'#B2B2B2'}
              >
                発行
              </RoundWideButton>
            </div>
          </section>
        </Container>

        <style global jsx>{`
          body {
            background-color: whitesmoke !important;
          }
        `}</style>

        <style jsx>{`
          label {
            font-size: 13px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default connect()(AdminFanInvite)
