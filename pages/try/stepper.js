import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'
import Steps, { Step } from 'rc-steps'
import AdminRegisterForm from '../../components/organisms/AdminRegisterForm'

const Index = () => (
  <div className="container" style={{ marginTop: 40 }}>
    <div className="panel" style={{ marginBottom: 40 }}>
      Communeへようこそ！<br />
      管理者登録のために以下の情報を教えてください。<br />
      これらの情報は後からいつでも修正することが可能です。
    </div>

    <Steps current={1} style={{ marginBottom: 40 }}>
      <Step title="管理者情報" description={<span>管理者登録をします</span>} />
      <Step
        title="コミュニティ情報"
        description={<span>コミュニティ情報を決めます</span>}
      />
      <Step
        title="デザインツール"
        description={<span>最適なデザイン決定のためのヒントを入力します</span>}
      />
    </Steps>

    <AdminRegisterForm />

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
    `}</style>
  </div>
)
export default Index
