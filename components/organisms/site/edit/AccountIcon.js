import React from 'react'
import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/LinkedImageModal'
import AccountIcon from 'components/organisms/site/base/AccountIcon'

const Composed = compose(
  c => withModal(c, Modal),
  toEditable
)(AccountIcon)
const Index = props => <Composed {...props} headerText={'通知アイコン編集'} />
export default Index
