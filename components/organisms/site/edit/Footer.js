import React from 'react'
import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/MenuListModal'
import Footer from 'components/organisms/site/base/Footer'

const Composed = compose(c => withModal(c, Modal), toEditable)(Footer)
const Index = props => <Composed {...props} headerText={'フッター編集'} />
export default Index
