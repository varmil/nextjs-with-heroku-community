import React from 'react'
import flowRight from 'lodash/flowRight'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/edit_modal/TextModal'
import PreInputForm from 'components/organisms/site/base/PreInputForm'

const Composed = flowRight(
  c => withModal(c, Modal),
  toEditable
)(PreInputForm)
const Index = props => <Composed {...props} headerText={'テキスト編集'} />
export default Index
