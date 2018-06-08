import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import CommunityLogo from 'components/organisms/site/base/CommunityLogo'
import Modal from 'components/templates/site/edit/LinkedImageModal'

const Composed = compose(c => withModal(c, Modal), toEditable)(CommunityLogo)

const Index = props => (
  <div>
    <Composed headerText={'ロゴ編集'} />
  </div>
)
export default Index
