import React from 'react'
import Router, { withRouter } from 'next/router'
import { animateScroll as scroll } from 'react-scroll'

import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'
import Steps, { Step } from 'rc-steps'
import AdminRegisterForm from '../../components/templates/AdminRegisterForm'
import CommunityRegisterForm from '../../components/templates/CommunityRegisterForm'
import DesignRegisterForm from '../../components/templates/DesignRegisterForm'
import LoadingModal from '../../components/organisms/LoadingModal'
import Color from '../../constants/Color'

const NEXT_PAGE_SLUG = '/try/theme'
const steps = {
  ADMIN: 0,
  COMMUNITY: 1,
  DESIGN: 2
}
const initialState = {
  currentStep: steps.ADMIN,
  modalIsOpen: false
}

class Stepper extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { router } = nextProps
    return {
      ...prevState,
      currentStep: router.query.step ? +router.query.step : steps.ADMIN
    }
  }

  createContents() {
    let contents = null
    switch (this.state.currentStep) {
      case steps.ADMIN:
        contents = <AdminRegisterForm />
        break
      case steps.COMMUNITY:
        contents = <CommunityRegisterForm />
        break
      case steps.DESIGN:
        contents = <DesignRegisterForm />
        break
    }
    return contents
  }

  createHeadMessage() {
    let message = ''
    switch (this.state.currentStep) {
      case steps.ADMIN:
        message = (
          <span>
            Communeへようこそ！<br />
            管理者登録のために以下の情報を教えてください。<br />
            これらの情報は後からいつでも修正することが可能です。
          </span>
        )
        break
      case steps.COMMUNITY:
        message = (
          <span>
            コミュニティ情報を決めます。<br />
            あとでいつでも変えられます。
          </span>
        )
        break
      case steps.DESIGN:
        message = (
          <span>
            企業サイトURL / SNSサイトを入力してください。<br />
            配色やフォント、フォロワー属性を読み取り、最適なデザインを<br />
            自動生成することができます！（後ほど追加、編集が可能です。）
          </span>
        )
        break
    }
    return message
  }

  onClickNextButton() {
    const isFinalStep = this.state.currentStep === steps.DESIGN
    if (isFinalStep) {
      // open the modal if it is final step
      this.setState({
        ...this.state,
        modalIsOpen: isFinalStep
      })
      // TODO: move to next page when HTTP request is finished
      setTimeout(() => {
        Router.push(NEXT_PAGE_SLUG)
      }, 1500)
    } else {
      // go to next step
      const step = this.state.currentStep + 1
      Router.push({ pathname: window.location.pathname, query: { step } })
      scroll.scrollToTop({ duration: 200 })
    }
  }

  render() {
    return (
      <div className="container" style={{ marginTop: 40, maxWidth: 720 }}>
        <div className="panel" style={{ marginBottom: 40 }}>
          {this.createHeadMessage()}
        </div>

        <Steps current={this.state.currentStep} style={{ marginBottom: 40 }}>
          <Step
            title="管理者情報"
            description={<span>管理者登録をします</span>}
          />
          <Step
            title="コミュニティ情報"
            description={<span>コミュニティ情報を決めます</span>}
          />
          <Step
            title="デザインツール"
            description={
              <span>最適なデザイン決定のためのヒントを入力します</span>
            }
          />
        </Steps>

        {this.createContents()}

        <div className="mt-4 text-center" style={{ marginBottom: 80 }}>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={this.onClickNextButton.bind(this)}
          >
            {this.state.currentStep === steps.DESIGN ? '編集画面へ' : '次へ'}
          </button>
        </div>

        <LoadingModal isOpen={this.state.modalIsOpen} />

        <style global jsx>{`
          .rc-steps-horizontal:not(.rc-steps-label-vertical)
            .rc-steps-item-description {
            max-width: 120px !important;
          }
        `}</style>

        <style jsx>{`
          .panel {
            padding: 30px;
            border: 3px ${Color.MAIN_BLUE} solid;
            border-radius: 20px;
          }

          button {
            padding: 10px 150px;
            background: ${Color.MAIN_BLUE};
          }
        `}</style>
      </div>
    )
  }
}

export default withRouter(Stepper)
