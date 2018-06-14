import React from 'react'
import BaseNavBar from 'components/templates/site/container/NavBar'
import CommunityLogo from 'components/organisms/site/edit/CommunityLogo'
import AccountIcon from 'components/organisms/site/edit/AccountIcon'
import NotificationIcon from 'components/organisms/site/edit/NotificationIcon'

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
