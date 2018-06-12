import React from 'react'
import remove from 'lodash/remove'
import uniqueId from 'lodash/uniqueId'
import { ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import WideModal from 'components/organisms/modal/WideModal'
import BgColorPicker from 'components/molecules/BgColorPicker'
import EditMenuBlock from 'components/organisms/EditMenuBlock'
import EditMenuAdd from 'components/organisms/EditMenuAdd'

class MenuBarModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editMenuBlocks: [] }
  }

  onClickBgColor(color, index) {
    console.info(color, index)
  }

  onClickMenuAdd() {
    const state = this.state
    const id = uniqueId('memuItem_')
    this.setState({
      ...state,
      editMenuBlocks: state.editMenuBlocks.concat(
        <EditMenuBlock
          text={`id is ${id}`}
          id={id}
          key={id}
          onDelete={this.onClickMenuDelete.bind(this)}
        />
      )
    })
  }

  onClickMenuDelete(id) {
    const state = this.state
    this.setState({
      ...state,
      editMenuBlocks: remove(state.editMenuBlocks, (v, i) => v.props.id !== id)
    })
  }

  render() {
    return (
      <WideModal isOpen={this.props.isOpen || false} toggle={this.props.toggle}>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="modalEdit_row-wide">
            <div className="modalEdit_rowHead">背景色</div>
            <div className="modalEdit_rowBody">
              <BgColorPicker onClick={this.onClickBgColor.bind(this)} />
            </div>
          </div>

          <div className="modalEdit_row-wide">
            <div className="modalEdit_rowHead">メニュー文字色</div>
            <div className="modalEdit_rowBody">
              <label>
                <input type="radio" defaultValue="#333" />黒
              </label>
              <label>
                <input type="radio" defaultValue="#fff" />白
              </label>
            </div>
          </div>

          <div className="modalEdit_row-wide">
            <div className="modalEdit_rowHead">メニュー位置</div>
            <div className="modalEdit_rowBody">
              <label>
                <input type="radio" name="navAlign" defaultValue="left" />左寄せ
              </label>
              <label>
                <input type="radio" name="navAlign" defaultValue="center" />センター揃え
              </label>
              <label>
                <input type="radio" name="navAlign" defaultValue="right" />右寄せ
              </label>
            </div>
          </div>

          <div className="modalEdit_row-wide">
            <div className="modalEdit_rowHead">メニュー</div>
            <div className="modalEdit_rowBody">
              <div id="editNav_menuGroup">
                {/* <EditMenuBlock text={`ホーム`} url="" /> */}
                {this.state.editMenuBlocks}
              </div>
              <EditMenuAdd onClick={this.onClickMenuAdd.bind(this)} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="mt-0 mb-4" style={{ border: 'none' }}>
          <Button
            className="w-25 ml-auto"
            color="primary"
            onClick={this.props.toggle}
          >
            保存
          </Button>
          <Button
            className="w-25 mr-auto"
            color="secondary"
            onClick={this.props.toggle}
          >
            キャンセル
          </Button>
        </ModalFooter>

        <style jsx>{`
          .modalEdit_row,
          .modalEdit_row-wide {
            display: table;
            width: 100%;
            line-height: 1.5;
            border-bottom: 1px dotted #ccc;
          }

          .modalEdit_rowHead {
            display: table-cell;
            width: 180px;
            padding: 30px 20px 30px 10px;
            vertical-align: top;
            font-weight: 700;
            font-size: 14px;
          }

          .modalEdit_rowBody {
            position: relative;
            display: table-cell;
            padding: 30px 10px 30px 20px;
          }

          .modalEdit_rowBody label {
            margin-right: 10px;
          }
        `}</style>
      </WideModal>
    )
  }
}

export default MenuBarModal
