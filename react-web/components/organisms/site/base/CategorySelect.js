import React from 'react'
import { connect } from 'react-redux'
import isNaN from 'lodash/isNaN'
import objectPath from 'object-path'
import Classes from 'constants/Classes'
import { PATH_MAP } from 'reducers/site'
import Rule from '/../shared/constants/Rule'

const Item = props => {
  const { onClick, text, isActive, activeColor } = props
  let btnClassName = 'btn btn-secondary'
  if (isActive) btnClassName = `${btnClassName} active`

  return (
    <li className={`scroll_item`}>
      <button
        type="button"
        className={btnClassName}
        // すでにActiveなボタンを押してもなにをしない
        onClick={isActive ? () => {} : onClick}
      >
        {text}
      </button>

      <style jsx>{`
        .scroll_item {
          margin-right: 10px;
          display: inline-block;
        }
        .scroll_item:first-child {
          margin-left: 10px;
        }

        button {
          min-width: 95px;
          max-width: 220px;
          font-size: 11px;
          font-weight: bold;

          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;

          background-color: ${isActive ? activeColor : '#8c8c8c'} !important;
          border-color: ${isActive ? activeColor : '#8c8c8c'} !important;
        }
      `}</style>
    </li>
  )
}

class CategorySelect extends React.Component {
  onClickCategory = index => {
    const { onClick } = this.props
    onClick && onClick(index)
  }

  // http://blog.keisuke11.com/webdesign/horizontal-scroll/
  createContents() {
    const props = this.props

    const activeCategoryIndex = !isNaN(+props.categoryIndex)
      ? +props.categoryIndex
      : Rule.ALL_CATEGORY_INDEX

    return (
      <div
        className={`horizontal_scroll_wrap ${Classes.EDITABLE}`}
        data-modal={`CategoryListModal`}
        data-action={props.action}
        data-path={props.propsPath}
      >
        <ul
          className="scroll_lst"
          onTouchStart={e => {
            props.onTouch(true)
          }}
          onTouchEnd={e => {
            props.onTouch(false)
          }}
        >
          {/* default all */}
          <Item
            onClick={() => this.onClickCategory(Rule.ALL_CATEGORY_INDEX)}
            text={'全て'}
            categoryIndex={Rule.ALL_CATEGORY_INDEX}
            isActive={activeCategoryIndex === Rule.ALL_CATEGORY_INDEX}
            activeColor={props.activeColor}
          />

          {/* skip null text */}
          {props.item.filter(e => e.text).map((e, i) => {
            return (
              <Item
                key={i}
                onClick={() => this.onClickCategory(e.categoryIndex)}
                text={e.text}
                categoryIndex={e.categoryIndex}
                isActive={activeCategoryIndex === e.categoryIndex}
                activeColor={props.activeColor}
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

export default connect(state => ({
  activeColor: objectPath.get(state.site, `${PATH_MAP.COLOR}.backgroundColor`)
}))(CategorySelect)
