import React from 'react'
import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/LinkedTextModal'
import BoxHeader from 'components/organisms/site/base/BoxHeader'

const Composed = compose(c => withModal(c, Modal), toEditable)(BoxHeader)
const Index = props => <Composed {...props} headerText={'ボックス編集'} />
export default Index
