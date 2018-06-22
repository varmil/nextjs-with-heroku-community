import React from 'react'
import uniqueId from 'lodash/uniqueId'
import update from 'immutability-helper'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import withSaveCancelFooter from 'components/organisms/modal/withSaveCancelFooter'
import ColorPicker from 'components/molecules/ColorPicker'
import MenuBlockEdit from 'components/organisms/edit_modal/MenuBlockEdit'
import MenuAddEdit from 'components/organisms/edit_modal/MenuAddEdit'

class MenuListModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: props.item,
      style: props.style
    }
  }

  onChangeBgColor(color, index) {
    this.setState(
      update(this.state, {
        style: { backgroundColor: { $set: color } }
      })
    )
  }

  onChangeColor(e) {
    this.setState(
      update(this.state, {
        style: { color: { $set: e.currentTarget.value } }
      })
    )
  }

  onChangeAlign(e) {
    this.setState(
      update(this.state, {
        style: { textAlign: { $set: e.currentTarget.value } }
      })
    )
  }

  onClickMenuAdd() {
    const state = this.state
    const id = uniqueId('memuItem_')
    this.setState({
      ...state,
      item: state.item.concat({
        // id: id,
        index: state.item.length,
        text: `${id}`
      })
    })
  }

  onChangeMenuText(e, index) {
    this.setState(
      update(this.state, {
        item: { [index]: { text: { $set: e.target.value } } }
      })
    )
  }

  onClickMenuDelete(index) {
    // NOTE: DO NOT use remove(), cause bug
    this.setState(update(this.state, { item: { $splice: [[index, 1]] } }))
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <ModalHeader>{props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="modalEdit_row-wide">
            <div className="modalEdit_rowHead">背景色</div>
            <div className="modalEdit_rowBody">
              <ColorPicker onClick={this.onChangeBgColor.bind(this)} />
            </div>
          </div>

          <div className="modalEdit_row-wide">
            <div className="modalEdit_rowHead">メニュー文字色</div>
            <div className="modalEdit_rowBody">
              <label>
                <input
                  type="radio"
                  defaultValue="#333"
                  name="color"
                  onClick={this.onChangeColor.bind(this)}
                />黒
              </label>
              <label>
                <input
                  type="radio"
                  defaultValue="#fff"
                  name="color"
                  onClick={this.onChangeColor.bind(this)}
                />白
              </label>
            </div>
          </div>

          <div className="modalEdit_row-wide">
            <div className="modalEdit_rowHead">メニュー位置</div>
            <div className="modalEdit_rowBody">
              <label>
                <input
                  type="radio"
                  name="navAlign"
                  defaultValue="left"
                  onClick={this.onChangeAlign.bind(this)}
                />左寄せ
              </label>
              <label>
                <input
                  type="radio"
                  name="navAlign"
                  defaultValue="center"
                  onClick={this.onChangeAlign.bind(this)}
                />センター揃え
              </label>
              <label>
                <input
                  type="radio"
                  name="navAlign"
                  defaultValue="right"
                  onClick={this.onChangeAlign.bind(this)}
                />右寄せ
              </label>
            </div>
          </div>

          <div className="modalEdit_row-wide">
            <div className="modalEdit_rowHead">メニュー</div>
            <div className="modalEdit_rowBody">
              <div id="editNav_menuGroup">
                {this.state.item.map((e, i) => (
                  <MenuBlockEdit
                    {...e}
                    key={i}
                    onChange={this.onChangeMenuText.bind(this)}
                    onDelete={this.onClickMenuDelete.bind(this)}
                  />
                ))}
              </div>
              <MenuAddEdit onClick={this.onClickMenuAdd.bind(this)} />
            </div>
          </div>
        </ModalBody>

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
      </React.Fragment>
    )
  }
}

export default withSaveCancelFooter(MenuListModal)
