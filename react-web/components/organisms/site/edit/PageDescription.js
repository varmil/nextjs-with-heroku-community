import React from 'react'
import flowRight from 'lodash/flowRight'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/TextModal'
import PageDescription from 'components/organisms/site/base/PageDescription'

const Composed = flowRight(
  c => withModal(c, Modal),
  toEditable
)(PageDescription)
const Index = props => <Composed {...props} headerText={'ページ説明編集'} />
export default Index
