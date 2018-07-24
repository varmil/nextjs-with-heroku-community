import React from 'react'
import { Link } from 'routes'
import Classes from 'constants/Classes'
import Rule from '/../shared/constants/Rule'

const Item = props => {
  const { className, onClick, text, categoryIndex } = props
  const isServer = typeof window === 'undefined'
  const path = !isServer ? window.location.pathname : ''

  return (
    <li className={`scroll_item ${className || ''}`}>
      <Link route={`${path}?categoryIndex=${categoryIndex}`}>
        <button type="button" className="btn btn-secondary" onClick={onClick}>
          {text}
        </button>
      </Link>

      <style jsx>{`
        .scroll_item {
          margin-right: 10px;
          display: inline-block;
        }
        .scroll_item:first-child {
          margin-left: 10px;
        }

        button {
          width: 95px;
          font-size: 11px;
          font-weight: bold;

          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      `}</style>
    </li>
  )
}

export default class CategorySelect extends React.Component {
  // http://blog.keisuke11.com/webdesign/horizontal-scroll/
  createContents() {
    const props = this.props
    return (
      <div
        className={`horizontal_scroll_wrap ${Classes.EDITABLE}`}
        data-modal={`CategoryListModal`}
        data-action={props.action}
        data-path={props.propsPath}
      >
        <ul className="scroll_lst">
          {/* default all */}
          <Item
            onClick={() =>
              props.onClick && props.onClick(Rule.ALL_CATEGORY_INDEX)
            }
            text={'全て'}
            categoryIndex={Rule.ALL_CATEGORY_INDEX}
          />

          {/* skip null text */}
          {props.item.filter(e => e.text).map((e, i) => {
            return (
              <Item
                key={i}
                onClick={() => props.onClick && props.onClick(e.categoryIndex)}
                text={e.text}
                categoryIndex={e.categoryIndex}
              />
            )
          })}
        </ul>

        <style jsx>{`
          .horizontal_scroll_wrap {
            overflow-y: hidden;
            margin: 0;
          }
          .scroll_lst {
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            padding: 0;
            margin-bottom: 0;
          }
        `}</style>
      </div>
    )
  }

  render() {
    return <React.Fragment>{this.createContents()}</React.Fragment>
  }
}
