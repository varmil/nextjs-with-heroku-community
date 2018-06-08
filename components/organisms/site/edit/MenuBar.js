import React from 'react'
import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/MenuBarModal'
import MenuBar from 'components/organisms/site/base/MenuBar'
// MenuItem is not Editable, because ManuBar Modal includes MenuItem setting
// import MenuItem from './MenuItem'

const Composed = compose(
  c => withModal(c, Modal),
  toEditable
)(MenuBar)
const Index = props => (
  <Composed /* menuItem={MenuItem} */ headerText={'メニューバー編集'} />
)
export default Index
