import React from 'react'
import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/TextBGImageModal'
import Welcome from 'components/organisms/site/base/Welcome'

const Composed = compose(c => withModal(c, Modal), toEditable)(Welcome)
const Index = props => <Composed {...props} headerText={'ウェルカム編集'} />
export default Index
