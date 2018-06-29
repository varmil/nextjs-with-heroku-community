import React from 'react'
import range from 'lodash/range'
import BoxContent from 'components/organisms/site/BoxContent'
import SubBanner from 'components/organisms/site/base/SubBanner'
import CategorySelect from 'components/organisms/site/base/CategorySelect'
import { SiteTalkRoom } from 'constants/ActionTypes'
import { PATH_MAP } from 'reducers/site'

// TALK BOX系のベースクラス
export default class BoxContents extends React.Component {
  createCategorySelect() {
    const props = this.props
    // TODO: hide categories in NEWS
    // if (!props.categorySelect) return null
    return (
      <section className="cat mt-3">
        <CategorySelect
          item={props.pageData.categories.item}
          action={props.action}
          propsPath={props.propsPath}
        />
      </section>
    )
  }

  createBoxContents() {
    const props = this.props
    const { boxContents } = props.pageData

    // サブバナー用に分割
    const FIRST_NUM = 2
    const firstArray = boxContents.slice(0, FIRST_NUM)
    const secondArray = boxContents.slice(FIRST_NUM)

    return (
      <div className="wrap">
        {firstArray.map((content, i) => {
          return (
            <div key={i} className="c">
              <BoxContent {...content} />
            </div>
          )
        })}

        <div className="subBanner my-3">{this.createSubBanners()}</div>

        {secondArray.map((content, i) => {
          return (
            <div key={i} className="c">
              <BoxContent {...content} />
            </div>
          )
        })}

        <style jsx>{`
          .c {
            padding: 0 15px;
            margin: 0 0 20px;
          }
        `}</style>
      </div>
    )
  }

  createSubBanners() {
    const subBanner = this.props.subBanner

    // dont show banner if current tab is not suitable
    if (!subBanner) return null
    return (
      <div className="">
        {range(subBanner.length).map(i => (
          <SubBanner
            key={i}
            contentState={subBanner[i].contentState}
            src={subBanner[i].src}
            backgroundColor={subBanner[i].backgroundColor}
            href={subBanner[i].href}
            action={SiteTalkRoom.SET_SUB_BANNER}
            index={i}
            propsPath={`${PATH_MAP.TALK_SUB_BANNER}.${i}`}
          />
        ))}
      </div>
    )
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <main>
          <section className="contents">{this.createBoxContents()}</section>
        </main>
      </React.Fragment>
    )
  }
}
