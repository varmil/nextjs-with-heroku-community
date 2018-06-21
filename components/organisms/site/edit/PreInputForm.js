import React from 'react'
import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/TextModal'
import PreInputForm from 'components/organisms/site/base/PreInputForm'

const Composed = compose(
  c => withModal(c, Modal),
  toEditable
)(PreInputForm)
const Index = props => <Composed {...props} headerText={'テキスト編集'} />
export default Index
