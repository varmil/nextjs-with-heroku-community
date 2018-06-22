import React from 'react'
import flowRight from 'lodash/flowRight'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/edit_modal/IconModal'
import NotificationIcon from 'components/organisms/site/base/NotificationIcon'

const Composed = flowRight(c => withModal(c, Modal), toEditable)(NotificationIcon)
const Index = props => <Composed {...props} headerText={'通知アイコン編集'} />
export default Index
