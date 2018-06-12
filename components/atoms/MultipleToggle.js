import React from 'react'

export class MultipleToggleGroup extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <ul className={`editMenu_selectLinkList ${props.className}`}>
          {props.children}
        </ul>

        <style jsx>{`
          ul,
          li {
            list-style-type: none;
          }

          .editMenu_selectLinkList {
            display: inline-block;
            vertical-align: middle;
            // margin-right: 10px;
            padding-left: 0;
            position: relative;
            top: 8px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

// 複数選択肢のトグル
export class MultipleToggle extends React.Component {
  addSelectedIfMatch() {
    return this.props.selected ? 'selected' : ''
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <li
          className={`editMenu_selectLink ${this.addSelectedIfMatch()}`}
          onClick={props.onClick}
        >
          {props.text}
        </li>

        <style jsx>{`
          .editMenu_selectLink {
            float: left;
            width: 80px;
            padding: 7px 0;
            text-align: center;
            background-color: #ccc;
            cursor: pointer;
            color: #999;
            font-size: 12px;
            transition: all 0.25s ease;
          }

          .editMenu_selectLink.selected,
          .editMenu_selectLink:hover {
            background-color: #0090a1;
            color: #fff;
          }

          .editMenu_selectLink:nth-child(1) {
            border-radius: 5px 0 0 5px;
          }

          .editMenu_selectLink:nth-child(2) {
            border-radius: 0 5px 5px 0;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
