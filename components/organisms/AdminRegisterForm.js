const Index = () => (
  <div className="box" style={{}}>
    <div className="my-3 px-3">会社情報</div>
    <hr className="my-1 mb-3" />
    <div className="form form-group my-3 px-3">
      <label htmlFor="CompanyName">会社名</label>
      <input
        type="email"
        className="form-control"
        id="CompanyName"
        aria-describedby="emailHelp"
      />

      <label htmlFor="CompanyNameYomi">会社名（ヨミガナ）</label>
      <input
        type="email"
        className="form-control"
        id="CompanyNameYomi"
        aria-describedby="emailHelp"
      />

      <label htmlFor="CompanyNameYomi">電話番号</label>
      <input
        type="email"
        className="form-control"
        id="CompanyNameYomi"
        aria-describedby="emailHelp"
      />
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
