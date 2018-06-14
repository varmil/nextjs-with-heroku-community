import React from 'react'
import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/LinkedImageModal'
import SubBanner from 'components/organisms/site/base/SubBanner'

const Composed = compose(c => withModal(c, Modal), toEditable)(SubBanner)
const Index = props => <Composed {...props} headerText={'サブバナー編集'} />
export default Index
