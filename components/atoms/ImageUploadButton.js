// from pera
const Index = props => (
  <button type="button" className={`imgUploaderButton ${props.className}`}>
    <i className="fa fa-folder-open" /> 画像を選択してアップロード
    <style jsx>{`
      .imgUploaderButton {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
        appearance: none;
        background: #f7f7f7;
        border-radius: 0;
        box-shadow: inset 0 0 0 2px #ccc;
        font-size: 16px;
        padding: 7px 15px;
        transition: all 0.3s ease;
        position: relative;
      }
    `}</style>
  </button>
)

export default Index
