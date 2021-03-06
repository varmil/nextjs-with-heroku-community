import React from 'react'
import range from 'lodash/range'
import update from 'immutability-helper'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc'

import withSaveCancelFooter from 'components/organisms/modal/withSaveCancelFooter'
import MenuBlockEdit from 'components/organisms/edit_modal/MenuBlockEdit'
import Rule from '/../shared/constants/Rule'

const SortableItem = SortableElement(({ value, orderIndex, onChange }) => {
  if (!value.editable) console.log(value)

  const baseStyle = { zIndex: 1100 }
  const addedStyle = value.editable
    ? { cursor: 'row-resize' }
    : { backgroundColor: '#bfbdbd' }

  return (
    <MenuBlockEdit
      {...value}
      style={{ ...baseStyle, ...addedStyle }}
      index={orderIndex}
      label={'カテゴリ' + value.categoryIndex}
      maxLength={Rule.CATNAME_MAX_LENGTH}
      editable={value.editable}
      onChange={onChange}
    />
  )
})

const SortableList = SortableContainer(({ items, onChange }) => {
  return (
    <div id="editNav_menuGroup">
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          disabled={!value.editable}
          value={value}
          orderIndex={index}
          onChange={onChange}
        />
      ))}
    </div>
  )
})

class MenuListModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: props.item
    }
  }

  onChangeMenuText(e, index) {
    this.setState(
      update(this.state, {
        item: { [index]: { text: { $set: e.target.value } } }
      })
    )
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      item: arrayMove(this.state.item, oldIndex, newIndex)
    })
  }

  render() {
    const state = this.state
    const props = this.props

    return (
      <React.Fragment>
        <ModalHeader>{props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="modalEdit_row-wide">
            <div className="modalEdit_rowHead">カテゴリ</div>
            <div className="modalEdit_rowBody">
              <SortableList
                items={this.state.item}
                onChange={this.onChangeMenuText.bind(this)}
                onSortEnd={this.onSortEnd.bind(this)}
              />
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
