import React from 'react'
import { animateScroll as scroll } from 'react-scroll'

import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'
import Steps, { Step } from 'rc-steps'
import AdminRegisterForm from '../../components/organisms/AdminRegisterForm'
import CommunityRegisterForm from '../../components/organisms/CommunityRegisterForm'
import DesignRegisterForm from '../../components/organisms/DesignRegisterForm'

const steps = {
  ADMIN: 0,
  COMMUNITY: 1,
  DESIGN: 2
}
const initialState = { currentStep: steps.ADMIN }

export default class Stepper extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
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

  render() {
    return (
      <div className="container" style={{ marginTop: 40 }}>
        <div className="panel" style={{ marginBottom: 40 }}>
          Communeへようこそ！<br />
          管理者登録のために以下の情報を教えてください。<br />
          これらの情報は後からいつでも修正することが可能です。
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
            onClick={() => {
              this.setState({
                ...this.state,
                currentStep: this.state.currentStep + 1
              })
              scroll.scrollToTop({ duration: 200 })
            }}
          >
            {this.state.currentStep === steps.DESIGN ? '編集画面へ' : '次へ'}
          </button>
        </div>

        <style global jsx>{`
          .rc-steps-horizontal:not(.rc-steps-label-vertical)
            .rc-steps-item-description {
            max-width: 120px !important;
          }
        `}</style>

        <style jsx>{`
          .panel {
            padding: 30px;
            border: 3px #2b6db2 solid;
            border-radius: 20px;
          }

          button {
            padding: 10px 150px;
            background: #2b6db2;
          }
        `}</style>
      </div>
    )
  }
}
