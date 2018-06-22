import React from 'react'
import MenuItem from './MenuItem'

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props)

    // this is needed because this class is extended
    this.menuItem = React.createElement(props.menuItem || MenuItem)
  }

  render() {
    const props = this.props
    return (
      <div
        id="menuBar"
        className={`cs-header-menubar ${props.className}`}
        style={{ ...props.style }}
      >
        <div className="container">
          <ul className="listContainer">
            {props.item.map((e, i) =>
              React.cloneElement(this.menuItem, { ...e, key: i })
            )}
          </ul>
        </div>

        {/* apply style for children */}
        <style global jsx>{`
          #menuBar.cs-header-menubar a {
            color: ${props.style.color};
          }
        `}</style>

        <style jsx>{`
          .cs-header-menubar {
            width: 100%;
            background-color: #633826;
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
