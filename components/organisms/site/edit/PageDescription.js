import React from 'react'
import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/TextModal'
import PageDescription from 'components/organisms/site/base/PageDescription'

const Composed = compose(
  c => withModal(c, Modal),
  toEditable
)(PageDescription)
const Index = props => <Composed {...props} headerText={'ページ説明編集'} />
export default Index
