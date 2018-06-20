import React from 'react'
import { connect } from 'react-redux'
import AvatarAndName from 'components/molecules/AvatarAndName'
import { getText } from 'utils/editor'
import { slide as Menu } from 'react-burger-menu'
import { decorator as reduxBurgerMenu } from 'redux-burger-menu'
const ReduxBurgerMenu = reduxBurgerMenu(Menu)

const styles = {
  // bmBurgerButton: {
  //   position: 'absolute',
  //   width: '30px',
  //   height: '26px',
  //   left: '25px',
  //   top: '30px'
  // },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    zIndex: 1003
  },
  bmMenu: {
    background: '#fff',
    padding: '2.5em 10px 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#000',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

class BurgerMenu extends React.Component {
  render() {
    const props = this.props
    return (
      <ReduxBurgerMenu customBurgerIcon={false} styles={styles}>
        <section className="mb-5">
          <AvatarAndName name={'Your Name Here'} />
        </section>

        <section className="mb-5">
          <h5>Commune Community</h5>
          <div className="ml-4">
            {props.top.boxes.map((box, i) => (
              <a key={i} href="" className="link">
                {getText(box.header.contentState) || box.header.defaultText}
              </a>
            ))}
          </div>
        </section>

        <section className="mb-5">
          <h5>Site Information</h5>
          <div className="ml-4">
            <a href="" className="link">
              お問い合わせ
            </a>
            <a href="" className="link">
              会員規約
            </a>
            <a href="" className="link">
              プライバシーポリシー
            </a>
            <a href="" className="link">
              ログアウト
            </a>
          </div>
        </section>

        <style jsx>{`
          a {
            color: black;
            margin: 5px 0;
          }

          .link {
            display: block;
          }
        `}</style>
      </ReduxBurgerMenu>
    )
  }
}

export default connect(state => ({
  top: state.site.top
}))(BurgerMenu)
