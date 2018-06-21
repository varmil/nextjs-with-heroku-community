import React from 'react'
import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/TextBGImageModal'
import CategorySelect from 'components/organisms/site/base/CategorySelect'

const Composed = compose(c => withModal(c, Modal), toEditable)(CategorySelect)
const Index = props => <Composed {...props} headerText={'カテゴリ編集'} />
export default Index
