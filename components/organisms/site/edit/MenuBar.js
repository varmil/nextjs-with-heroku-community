import React from 'react'
import flowRight from 'lodash/flowRight'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/IconModal'
import MenuBar from 'components/organisms/site/base/MenuBar'

const Composed = flowRight(
  c => withModal(c, Modal),
  toEditable
)(MenuBar)
const Index = props => <Composed {...props} headerText={'メニューバー編集'} />
export default Index
