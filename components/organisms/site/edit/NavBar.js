import React from 'react'
import BaseNavBar from 'components/organisms/site/base/NavBar'
import CommunityLogo from './CommunityLogo'
import AccountIcon from './AccountIcon'
import NotificationIcon from './NotificationIcon'

// NOTE: extends component cause hot load broken !
// export default class NavBar extends BaseNavBar {
//   constructor(props) {
//     super(props)
//
//     this.communityLogo = CommunityLogo
//     this.accountIcon = AccountIcon
//     this.notificationIcon = NotificationIcon
//   }
// }

const Index = props => (
  <React.Fragment>
    <BaseNavBar
      communityLogo={CommunityLogo}
      accountIcon={AccountIcon}
      notificationIcon={NotificationIcon}
    />
  </React.Fragment>
)
export default Index
