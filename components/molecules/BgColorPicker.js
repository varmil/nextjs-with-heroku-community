import React from 'react'

// each color element
const Element = props => {
  return (
    <li
      color={props.color}
      style={{ backgroundColor: props.color }}
      className={props.className}
      onClick={() => props.onClick(props.color, props.index)}
    >
      <style jsx>{`
        li {
          list-style-type: none;
        }

        li:nth-child(9n + 1) {
          clear: left;
        }

        li {
          float: left;
          display: block;
          width: 20px;
          height: 20px;
          margin: 0 10px 10px 0;
          cursor: pointer;
        }

        li.selected:after {
          content: '✔';
          display: block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #000;
        }

        li:nth-last-child(-n + 18):after {
          color: #fff;
        }
      `}</style>
    </li>
  )
}

const COLORS = [
  '#ffffff',
  '#fee8e6',
  '#fef2e6',
  '#fff8db',
  '#edf7d7',
  '#ebfff4',
  '#e9f7fd',
  '#edf0ff',
  '#fcf4ff',
  '#e6e6e6',
  '#ff8a7c',
  '#ffcb9c',
  '#ffe05a',
  '#c0e76c',
  '#a4f3c5',
  '#b2ddf1',
  '#c7cff5',
  '#e1bfef',
  '#b3b3b3',
  '#eb4024',
  '#f47e00',
  '#f8ca00',
  '#9dd219',
  '#06b056',
  '#3199df',
  '#4258d8',
  '#9c56b8',
  '#666666',
  '#c33925',
  '#d55500',
  '#ba9600',
  '#76a900',
  '#00752e',
  '#006394',
  '#01188e',
  '#681d93',
  '#000000',
  '#670800',
  '#813c00',
  '#755e00',
  '#456700',
  '#004d1e',
  '#004568',
  '#000f69',
  '#360a4d'
]

export default class BgColorPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selectedIndex: 0 }
  }

  onClick(color, index) {
    this.setState({ ...this.state, selectedIndex: index })
    this.props.onClick(color, index)
  }

  render() {
    const props = this.props

    return (
      <React.Fragment>
        <ul id="editNav_bgColor" className="editNav_colorTipList">
          {COLORS.map((c, i) => (
            <Element
              key={c}
              index={i}
              color={c}
              onClick={this.onClick.bind(this)}
              className={this.state.selectedIndex === i ? 'selected' : ''}
            />
          ))}
        </ul>

        <style jsx>{`
          .editNav_colorTipList {
            overflow: hidden;
            padding-left: 0;
          }

          ul {
            list-style-type: none;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
