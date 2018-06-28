import React from 'react'
import range from 'lodash/range'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import MainBanner from 'components/organisms/site/base/MainBanner'
import NavBar from 'components/templates/container/NavBar'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  dynamicImport() {
    // if (this.props.edit) {
    //   NavBar = dynamic(import('components/templates/container/EditableNavBar'))
    // } else {
    //   NavBar = dynamic(import('components/templates/container/NavBar'))
    // }
  }

  render() {
    const props = this.props
    const mainBanner = props.mainBannerProps

    return (
      <React.Fragment>
        <header>
          <NavBar />

          {range(mainBanner.length).map(i => (
            <MainBanner
              key={i}
              className="mb-3"
              contentState={mainBanner[i].contentState}
              src={mainBanner[i].src}
              backgroundColor={mainBanner[i].backgroundColor}
              href={mainBanner[i].href}
              index={i}
              propsPath={`${PATH_MAP.MAIN_BANNER}.${i}`}
            />
          ))}
        </header>
      </React.Fragment>
    )
  }
}

export default connect(state => ({
  common: state.site.common,
  mainBannerProps: objectPath.get(state.site, `${PATH_MAP.MAIN_BANNER}`)
}))(Header)
