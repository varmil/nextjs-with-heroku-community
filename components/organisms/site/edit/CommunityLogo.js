import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import CommunityLogo from 'components/organisms/site/base/CommunityLogo'
import Modal from 'components/templates/site/edit/LinkedImageModal'

export default compose(c => withModal(c, Modal), toEditable)(CommunityLogo)
