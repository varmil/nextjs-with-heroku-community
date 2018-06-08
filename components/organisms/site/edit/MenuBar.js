import toEditable from './Editable'
import withTextModal from './withTextModal'
import MenuBar from 'components/organisms/site/base/MenuBar'

export default withTextModal(toEditable(MenuBar))
