import TallTextInput from '../../components/atoms/TallTextInput'
import HyphenInput from '../../components/molecules/HyphenInput'

const mbStyle = { marginBottom: 20 }

const Index = () => (
  <div>
    <div className="box" style={{}}>
      <div className="my-3 px-3">会社情報</div>
      <hr className="my-1 mb-3" />
      <div className="form form-group my-3 px-5">
        <label>会社名</label>
        <TallTextInput style={mbStyle} />

        <label>会社名（ヨミガナ）</label>
        <TallTextInput style={mbStyle} />

        <label>電話番号</label>
        <HyphenInput values={[null, null, null]} style={mbStyle} />

        <label>住所（郵便番号）</label>
        <HyphenInput values={[null, null]} style={mbStyle} />

        <label>住所（都道府県）</label>
        <TallTextInput style={mbStyle} />

        <label>住所（市区町村）</label>
        <TallTextInput style={mbStyle} />

        <label>住所（丁目・番地）</label>
        <TallTextInput style={mbStyle} />

        <label>住所（建物名・部屋番号）</label>
        <TallTextInput style={{ marginBottom: 40 }} />
      </div>

      <div className="my-3 px-3">担当者様情報</div>
      <hr className="my-1 mb-3" />
      <div className="form form-group my-3 px-5">
        <div className="row">
          <div className="col-6">
            <label>性</label>
            <TallTextInput style={mbStyle} />
          </div>
          <div className="col-6">
            <label>名</label>
            <TallTextInput style={mbStyle} />
          </div>
        </div>

        <label>部署名</label>
        <TallTextInput style={{ marginBottom: 40 }} />
      </div>
    </div>

    <style jsx>{`
      .box {
        border: 3px #2b6db2 solid;
      }
    `}</style>
  </div>
)
export default Index
