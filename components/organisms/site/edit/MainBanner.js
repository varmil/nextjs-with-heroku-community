import React from 'react'
import flowRight from 'lodash/flowRight'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/TextBGImageModal'
import MainBanner from 'components/organisms/site/base/MainBanner'

const Composed = flowRight(c => withModal(c, Modal), toEditable)(MainBanner)
const Index = props => <Composed {...props} headerText={'バナー編集'} />
export default Index
