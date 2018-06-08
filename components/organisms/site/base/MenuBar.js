import React from 'react'
import MenuItem from './MenuItem'

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props)

    // this is needed because this class is extended
    this.menuItem = React.createElement(props.menuItem || MenuItem)
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <div className="cs-header-menubar">
          <div className="container">
            <ul className="listContainer">
              {React.cloneElement(this.menuItem, {
                text: 'ホーム',
                active: true
              })}
              {React.cloneElement(this.menuItem, { text: 'トークルーム' })}
              {React.cloneElement(this.menuItem, { text: '企業発信' })}
              {React.cloneElement(this.menuItem, { text: '企業ストーリー' })}
              {React.cloneElement(this.menuItem, { text: '投票・アンケート' })}
              {React.cloneElement(this.menuItem, { text: 'お知らせ' })}
            </ul>
          </div>
        </div>

        <style jsx>{`
          .cs-header-menubar {
            width: 100%;
            background: #633826;
          }

          .listContainer {
            height: 44px;
            overflow: hidden;
          }

          ul,
          ol {
            padding-left: 0;
          }

          ul,
          ol,
          dl {
            margin: 0;
            font-size: 1em;
            font-weight: normal;
          }
        `}</style>
      </div>
    )
  }
}
