import React from 'react'
import flowRight from 'lodash/flowRight'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/TextBGImageModal'
import BoxHeader from 'components/organisms/site/base/BoxHeader'

const Composed = flowRight(c => withModal(c, Modal), toEditable)(BoxHeader)
const Index = props => <Composed {...props} headerText={'ボックス編集'} />
export default Index
