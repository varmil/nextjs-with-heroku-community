import React from 'react'
import flowRight from 'lodash/flowRight'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/IconModal'
import AccountIcon from 'components/organisms/site/base/AccountIcon'

const Composed = flowRight(c => withModal(c, Modal), toEditable)(AccountIcon)
const Index = props => (
  <Composed {...props} headerText={'アカウントアイコン編集'} />
)
export default Index
