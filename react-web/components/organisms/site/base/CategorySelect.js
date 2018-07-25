import React from 'react'
import { Router } from 'routes'
import isNaN from 'lodash/isNaN'
import Classes from 'constants/Classes'
import Rule from '/../shared/constants/Rule'

const Item = props => {
  const { onClick, text, isActive } = props
  let btnClassName = 'btn btn-secondary'
  if (isActive) btnClassName = `${btnClassName} active`

  return (
    <li className={`scroll_item`}>
      <button type="button" className={btnClassName} onClick={onClick}>
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

class CategorySelect extends React.Component {
  onClickCategory = index => {
    const { onClick } = this.props

    // 先にハンドラ処理を行って、コンテンツの初期化
    onClick && onClick(index)

    // クエリストリングのみ変更する。(クライアントでしか実行されないのでwindowを使う)
    Router.replaceRoute(`${window.location.pathname}?categoryIndex=${index}`)
  }

  // http://blog.keisuke11.com/webdesign/horizontal-scroll/
  createContents() {
    const props = this.props

    const activeCategoryIndex = !isNaN(+props.categoryIndex)
      ? +props.categoryIndex
      : Rule.ALL_CATEGORY_INDEX
    console.log('activeCategoryIndex', activeCategoryIndex)

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
            onClick={() => this.onClickCategory(Rule.ALL_CATEGORY_INDEX)}
            text={'全て'}
            categoryIndex={Rule.ALL_CATEGORY_INDEX}
            isActive={activeCategoryIndex === Rule.ALL_CATEGORY_INDEX}
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

export default CategorySelect
