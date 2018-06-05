import TallTextInput from '../../components/atoms/TallTextInput'
import HyphenInput from '../../components/molecules/HyphenInput'

const Index = () => (
  <div className="box" style={{}}>
    <div className="my-3 px-3">会社情報</div>
    <hr className="my-1 mb-3" />
    <div className="form form-group my-3 px-5">
      <label htmlFor="CompanyName">会社名</label>
      <TallTextInput style={{ marginBottom: 20 }} />

      <label htmlFor="CompanyNameYomi">会社名（ヨミガナ）</label>
      <TallTextInput style={{ marginBottom: 20 }} />

      <label htmlFor="PhoneNum">電話番号</label>
      <HyphenInput values={[null, null, null]} style={{ marginBottom: 20 }} />

      <label htmlFor="ZipCode">住所（郵便番号）</label>
      <HyphenInput values={[null, null]} style={{ marginBottom: 20 }} />
    </div>

    <style global jsx>{`
      .rc-steps-horizontal:not(.rc-steps-label-vertical)
        .rc-steps-item-description {
        max-width: 120px !important;
      }
    `}</style>

    <style jsx>{`
      .box {
        border: 3px #2b6db2 solid;
      }
    `}</style>
  </div>
)
export default Index
