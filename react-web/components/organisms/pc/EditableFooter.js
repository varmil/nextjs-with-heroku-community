import React from 'react'
import flowRight from 'lodash/flowRight'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/MenuListModal'
import Footer from 'components/organisms/site/base/Footer'

const Composed = flowRight(c => withModal(c, Modal), toEditable)(Footer)
const Index = props => <Composed {...props} headerText={'フッター編集'} />
export default Index
