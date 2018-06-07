import NavBar from 'components/organisms/site/base/NavBar'
import CommunityLogo from './CommunityLogo'
import AccountIcon from './AccountIcon'
import NotificationIcon from './NotificationIcon'

export default class EditableNavBar extends NavBar {
  constructor(props) {
    super(props)

    this.communityLogo = CommunityLogo
    this.accountIcon = AccountIcon
    this.notificationIcon = NotificationIcon
  }
}
