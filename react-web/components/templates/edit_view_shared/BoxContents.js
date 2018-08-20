import React from 'react'
import range from 'lodash/range'
import BoxContent from 'components/organisms/site/BoxContent'
import SubBanner from 'components/organisms/site/base/SubBanner'
import CategorySelect from 'components/organisms/site/base/CategorySelect'
import BoxType from '/../shared/constants/BoxType'
import Fade from 'react-reveal/Fade'

// return Component Class
const factoryBox = boxType => {
  switch (boxType) {
    case BoxType.index.voice:
      return props => (
        <BoxContent {...props} topPhoto goingVote comments={false} />
      )
    default:
      return props => <BoxContent {...props} />
  }
}

// POST概要を並べる系のベースクラス
export default class BoxContents extends React.Component {
  createCategorySelect() {
    // hide categories in VOICE
    if (!this.categories) return null
    const { pageData, activeCategoryIndex, onTouchCategory } = this.props

    return (
      <section className="cat py-3 bg-white">
        <CategorySelect
          item={pageData.categories.item}
          action={this.categories.action}
          propsPath={this.categories.propsPath}
          // 現在アクティブなカテゴリ
          categoryIndex={activeCategoryIndex}
          onClick={i => this.onChangeCategory(i)}
          onTouch={onTouchCategory}
        />
      </section>
    )
  }

  createBoxContents() {
    const props = this.props
    const { boxContents } = props

    // dont render if no contents
    if (!Array.isArray(boxContents) || boxContents.length === 0) return null

    // サブバナー用に分割
    const FIRST_NUM = 2
    const firstArray = boxContents.slice(0, FIRST_NUM)
    const secondArray = boxContents.slice(FIRST_NUM)

    return (
      <section className="contents py-3">
        <div className="wrap">
          {firstArray.map((content, i) => {
            const MyBoxContent = factoryBox(content.boxType)
            return (
              <div key={i} className="c">
                <Fade>
                  <MyBoxContent {...content} />
                </Fade>
              </div>
            )
          })}

          {/* NOTE: 2018/08/20 アプリ申請の見栄え調整のため一旦コメントアウト。
            peraっぽく非表示〜どこにでもバナー差し込めるのがベスト */}
          {/* {this.createSubBanners()} */}

          {secondArray.map((content, i) => {
            const MyBoxContent = factoryBox(content.boxType)
            return (
              <div key={i} className="c">
                <Fade>
                  <MyBoxContent {...content} />
                </Fade>
              </div>
            )
          })}
        </div>

        <style jsx>{`
          .contents {
            background-color: #f0f0f0 !important;
          }

          .c {
            padding: 0 15px;
            margin: 0 0 20px;
          }
        `}</style>
      </section>
    )
  }

  createSubBanners() {
    const subBanner = this.props.subBanner

    // dont show banner if current tab is not suitable
    if (!subBanner) return null
    return (
      <div className="subBanner my-3">
        {range(subBanner.length).map(i => (
          <SubBanner
            key={i}
            contentState={subBanner[i].contentState}
            src={subBanner[i].src}
            backgroundColor={subBanner[i].backgroundColor}
            href={subBanner[i].href}
            blank={subBanner[i].blank}
            action={this.subBanner.action}
            index={i}
            propsPath={`${this.subBanner.propsPath}.${i}`}
          />
        ))}
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <main>{this.createBoxContents()}</main>
      </React.Fragment>
    )
  }
}
