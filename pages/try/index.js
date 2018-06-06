import Link from 'next/link'

const Index = () => (
  <div id="tryIndex" className="">
    <div className="box text-center">
      <h1>
        <img src="/static/img/logo-white.png" alt="Commune" />
      </h1>
      <h2>１分登録完了。すぐにご利用いただけます。</h2>

      <div className="form">
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="メールアドレス"
          style={{ marginBottom: 10 }}
        />
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="ご希望のパスワード（８文字以上）"
          style={{ marginBottom: 10 }}
        />

        <div className="form-check" style={{ marginBottom: 20 }}>
          <input className="form-check-input" type="checkbox" value="" />
          <label className="form-check-label">
            利用規約・プライバシーポリシーに同意する
          </label>
        </div>

        <Link href="/try/stepper">
          <button type="button" className="btn btn-warning btn-try">
            無料で試してみる
          </button>
        </Link>
      </div>
    </div>

    <style global jsx>{`
      body {
        background-color: #2b6db2 !important;
      }
    `}</style>
    <style jsx>{`
      img {
        width: 100%;
      }

      h2 {
        color: white;
        margin-bottom: 50px;
      }

      .form {
        width: 60%;
        margin: 0 auto;
        color: white;
      }

      .btn-try {
        background-color: rgb(217, 115, 52);
        padding: 10px 35px;
        color: white;
        border: white 1px solid;
      }

      .box {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        margin: auto;

        width: 700px;
        height: 400px;
      }
    `}</style>
  </div>
)
export default Index
