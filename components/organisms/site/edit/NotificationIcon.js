import React from 'react'
import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/IconModal'
import NotificationIcon from 'components/organisms/site/base/NotificationIcon'

const Composed = compose(c => withModal(c, Modal), toEditable)(NotificationIcon)
const Index = props => <Composed {...props} headerText={'通知アイコン編集'} />
export default Index
