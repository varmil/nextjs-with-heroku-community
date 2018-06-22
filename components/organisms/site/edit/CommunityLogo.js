import React from 'react'
import flowRight from 'lodash/flowRight'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/ImageModal'
import CommunityLogo from 'components/organisms/site/base/CommunityLogo'

const Composed = flowRight(c => withModal(c, Modal), toEditable)(CommunityLogo)
const Index = props => <Composed {...props} headerText={'ロゴ編集'} />
export default Index
