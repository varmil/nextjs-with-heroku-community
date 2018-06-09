import React from 'react'

export default class BgColorPicker extends React.Component {
  render() {
    const props = this.props

    return (
      <React.Fragment style={props.style}>
        <ul id="editNav_bgColor" className="editNav_colorTipList">
          <li
            data-color="#ffffff"
            style={{ backgroundColor: '#ffffff' }}
            className="selected"
          />
          <li data-color="#fee8e6" style={{ backgroundColor: '#fee8e6' }} />
          <li data-color="#fef2e6" style={{ backgroundColor: '#fef2e6' }} />
          <li data-color="#fff8db" style={{ backgroundColor: '#fff8db' }} />
          <li data-color="#edf7d7" style={{ backgroundColor: '#edf7d7' }} />
          <li data-color="#ebfff4" style={{ backgroundColor: '#ebfff4' }} />
          <li data-color="#e9f7fd" style={{ backgroundColor: '#e9f7fd' }} />
          <li data-color="#edf0ff" style={{ backgroundColor: '#edf0ff' }} />
          <li data-color="#fcf4ff" style={{ backgroundColor: '#fcf4ff' }} />
          <li data-color="#e6e6e6" style={{ backgroundColor: '#e6e6e6' }} />
          <li data-color="#ff8a7c" style={{ backgroundColor: '#ff8a7c' }} />
          <li data-color="#ffcb9c" style={{ backgroundColor: '#ffcb9c' }} />
          <li data-color="#ffe05a" style={{ backgroundColor: '#ffe05a' }} />
          <li data-color="#c0e76c" style={{ backgroundColor: '#c0e76c' }} />
          <li data-color="#a4f3c5" style={{ backgroundColor: '#a4f3c5' }} />
          <li data-color="#b2ddf1" style={{ backgroundColor: '#b2ddf1' }} />
          <li data-color="#c7cff5" style={{ backgroundColor: '#c7cff5' }} />
          <li data-color="#e1bfef" style={{ backgroundColor: '#e1bfef' }} />
          <li data-color="#b3b3b3" style={{ backgroundColor: '#b3b3b3' }} />
          <li data-color="#eb4024" style={{ backgroundColor: '#eb4024' }} />
          <li data-color="#f47e00" style={{ backgroundColor: '#f47e00' }} />
          <li data-color="#f8ca00" style={{ backgroundColor: '#f8ca00' }} />
          <li data-color="#9dd219" style={{ backgroundColor: '#9dd219' }} />
          <li data-color="#06b056" style={{ backgroundColor: '#06b056' }} />
          <li data-color="#3199df" style={{ backgroundColor: '#3199df' }} />
          <li data-color="#4258d8" style={{ backgroundColor: '#4258d8' }} />
          <li data-color="#9c56b8" style={{ backgroundColor: '#9c56b8' }} />
          <li data-color="#666666" style={{ backgroundColor: '#666666' }} />
          <li data-color="#c33925" style={{ backgroundColor: '#c33925' }} />
          <li data-color="#d55500" style={{ backgroundColor: '#d55500' }} />
          <li data-color="#ba9600" style={{ backgroundColor: '#ba9600' }} />
          <li data-color="#76a900" style={{ backgroundColor: '#76a900' }} />
          <li data-color="#00752e" style={{ backgroundColor: '#00752e' }} />
          <li data-color="#006394" style={{ backgroundColor: '#006394' }} />
          <li data-color="#01188e" style={{ backgroundColor: '#01188e' }} />
          <li data-color="#681d93" style={{ backgroundColor: '#681d93' }} />
          <li data-color="#000000" style={{ backgroundColor: '#000000' }} />
          <li data-color="#670800" style={{ backgroundColor: '#670800' }} />
          <li data-color="#813c00" style={{ backgroundColor: '#813c00' }} />
          <li data-color="#755e00" style={{ backgroundColor: '#755e00' }} />
          <li data-color="#456700" style={{ backgroundColor: '#456700' }} />
          <li data-color="#004d1e" style={{ backgroundColor: '#004d1e' }} />
          <li data-color="#004568" style={{ backgroundColor: '#004568' }} />
          <li data-color="#000f69" style={{ backgroundColor: '#000f69' }} />
          <li data-color="#360a4d" style={{ backgroundColor: '#360a4d' }} />
        </ul>

        <style jsx>{`
          .editNav_colorTipList {
            overflow: hidden;
            padding-left: 0;
          }

          ul,
          li {
            list-style-type: none;
          }

          .editNav_colorTipList > li:nth-child(9n + 1) {
            clear: left;
          }

          .editNav_colorTipList > li {
            float: left;
            display: block;
            width: 20px;
            height: 20px;
            margin: 0 10px 10px 0;
            cursor: pointer;
          }

          .editNav_colorTipList > li.selected:after {
            content: '✔';
            display: block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            color: #000;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
