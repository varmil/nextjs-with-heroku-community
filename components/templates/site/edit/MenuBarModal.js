// // TODO:
import React from 'react'
import { ModalHeader, ModalBody } from 'reactstrap'
import WideModal from 'components/organisms/modal/WideModal'
import BgColorPicker from 'components/molecules/BgColorPicker'
import EditMenuBlock from 'components/organisms/EditMenuBlock'

class MenuBarModal extends React.Component {
  render() {
    return (
      <WideModal isOpen={this.props.isOpen || false} toggle={this.props.toggle}>
        <ModalHeader>{this.props.headerText}</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="modalEdit_row-wide">
              <div className="modalEdit_rowHead">背景色</div>
              <div className="modalEdit_rowBody">
                <BgColorPicker />
              </div>
            </div>

            <div className="modalEdit_row-wide">
              <div className="modalEdit_rowHead">メニュー文字色</div>
              <div className="modalEdit_rowBody">
                <label>
                  <input
                    type="radio"
                    name="menuTextColor"
                    defaultValue="#333"
                  />黒
                </label>
                <label>
                  <input
                    type="radio"
                    name="menuTextColor"
                    defaultValue="#fff"
                  />白
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
                  <EditMenuBlock text={`ホーム`} url="" />
                  <EditMenuBlock text={`ホーム`} />
                </div>
                <div id="editNav_add" className="editNav_add">
                  <div id="editNav_addBtn" className="editNav_addBtn">
                    <i className="fa fa-plus" />
                  </div>
                  <i className="fa fa-plus">
                    <div className="editNav_addTooltip">メニューを追加</div>
                  </i>
                </div>
                <i className="fa fa-plus" />
              </div>
            </div>
            <div id="editNav_menuInstance">
              <div className="editNav_menuBlock">
                <div>
                  <label className="editMenu_group">
                    <div className="editMenu_text">テキスト</div>
                    <div className="editMenu_controller">
                      <input
                        className="menuText"
                        type="text"
                        name="menuText"
                        defaultValue
                      />
                    </div>
                  </label>
                </div>
                <div className="editMenu_group">
                  <div className="editMenu_text">リンク</div>
                  <div className="editMenu_controller">
                    <ul className="editMenu_selectLinkList">
                      <li
                        className="editMenu_selectLink internal"
                        data-type="internal"
                      >
                        ページ内
                      </li>
                      <li
                        className="editMenu_selectLink external"
                        data-type="external"
                      >
                        別ページ
                      </li>
                    </ul>
                    <div className="editMenu_menuLinkGroup">
                      <div className="editMenu_link external">
                        <input
                          className="menuHref"
                          type="text"
                          name="menuHref"
                          defaultValue
                          placeholder="https://peraichi.com"
                        />
                        <label className="editMenu_target">
                          <input type="checkbox" name="menuTarget" />別ウインドウ
                        </label>
                      </div>
                      <div className="editMenu_link internal" />
                    </div>
                  </div>
                  <div className="editNav_delete">
                    <div className="editNav_deleteBtn">
                      <i className="fa fa-times" />
                    </div>
                    <i className="fa fa-times" />
                  </div>
                  <i className="fa fa-times" />
                </div>
                <i className="fa fa-times" />
              </div>
              <i className="fa fa-times">
                <div className="modalEdit_actionBtns">
                  <a className="modal_btn-main save">保存</a>
                  <a className="modal_btn-default cancel">キャンセル</a>
                </div>
              </i>
            </div>
            <i className="fa fa-times" />
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
