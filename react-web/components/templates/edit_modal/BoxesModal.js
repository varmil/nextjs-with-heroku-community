import React from 'react'
import immutable from 'object-path-immutable'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc'

import withSaveCancelFooter from 'components/organisms/modal/withSaveCancelFooter'
import MenuBlockEdit from 'components/organisms/edit_modal/MenuBlockEdit'

const SortableItem = SortableElement(({ value, orderIndex, onChange }) => {
  const baseStyle = { zIndex: 1100 }

  return (
    <MenuBlockEdit
      {...value}
      style={{ ...baseStyle }}
      index={orderIndex}
      label={'ボックス' + value.slug}
      text={value.header.text}
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
          value={value}
          orderIndex={index}
          onChange={onChange}
        />
      ))}
    </div>
  )
})

class BoxesModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: props.item
    }
  }

  onChangeMenuText(e, index) {
    this.setState(
      immutable.set(this.state, `item.${index}.header.text`, e.target.value)
    )
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState({
      item: arrayMove(this.state.item, oldIndex, newIndex)
    })
  }

  render() {
    const props = this.props

    return (
      <React.Fragment>
        <ModalHeader>{props.headerText}</ModalHeader>
        <ModalBody className="container">
          <div className="modalEdit_row-wide">
            <div className="modalEdit_rowHead">ボックス名</div>
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

export default withSaveCancelFooter(BoxesModal)
