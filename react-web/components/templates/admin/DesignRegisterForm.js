function InputGroup(props) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text icon">{props.icon}</span>
      </div>
      <input type="text" className="form-control" placeholder={props.text} />

      <style jsx>{`
        .icon {
          width: 50px;
          margin: 0 auto;
          display: inline-block;
        }
      `}</style>
    </div>
  )
}

const Index = () => (
  <div>
    <div className="mx-auto mb-5" style={{ maxWidth: 500 }}>
      <InputGroup
        icon={<i className="fas fa-globe" />}
        text="企業サイトURL / オウンドメディアURL"
      />
      <InputGroup
        icon={<i className="fab fa-facebook-f" />}
        text="Facebookページリンク"
      />
      <InputGroup
        icon={<i className="fab fa-twitter" />}
        text="Twitterアカウントリンク"
      />
      <InputGroup
        icon={<i className="fab fa-instagram" />}
        text="Instagramアカウントリンク"
      />
    </div>

    <style jsx>{`
      .box {
        border: 3px #2b6db2 solid;
      }
    `}</style>
  </div>
)
export default Index
