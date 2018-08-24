import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const options = ['削除する']

const ITEM_SIZE = 14
const ITEM_HEIGHT = 48

class ConfirmDialog extends React.Component {
  render() {
    const props = this.props
    return (
      <div>
        <Modal
          isOpen={props.modal}
          toggle={props.toggle}
          className={this.props.className}
          centered
        >
          <ModalBody className="text-center">{props.children}</ModalBody>
          <ModalFooter>
            <div className="mx-auto">
              <Button
                color="danger"
                onClick={() => {
                  props.onConfirm()
                  props.toggle()
                }}
              >
                削除する
              </Button>{' '}
              <Button color="secondary" onClick={props.toggle}>
                キャンセル
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

class LongMenu extends React.Component {
  state = {
    anchorEl: null,
    modal: false
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClickItem = i => {
    // NOTE: 2018/08/24現在、「削除する」しかないので
    if (i === 0) {
      this.toggleModal()
    }

    this.handleClose()
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { size, onDelete } = this.props
    const { anchorEl, modal } = this.state
    const open = Boolean(anchorEl)

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          style={{ fontSize: size || ITEM_SIZE }}
          onClick={this.handleClick}
        >
          <i className="fas fa-ellipsis-v" />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          {options.map((option, i) => (
            <MenuItem
              key={option}
              selected={option === 'Pyxis'}
              onClick={() => this.handleClickItem(i)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        <ConfirmDialog
          modal={modal}
          toggle={this.toggleModal}
          onConfirm={onDelete}
        >
          本当に削除しますか？
        </ConfirmDialog>
      </div>
    )
  }
}

export default LongMenu
