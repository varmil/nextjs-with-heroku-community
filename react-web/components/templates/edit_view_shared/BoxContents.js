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
    const props = this.props
    return (
      <section className="cat my-3">
        <CategorySelect
          item={props.pageData.categories.item}
          action={this.categories.action}
          propsPath={this.categories.propsPath}
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

        {this.createSubBanners()}

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
      <div className="subBanner my-3">
        {range(subBanner.length).map(i => (
          <SubBanner
            key={i}
            contentState={subBanner[i].contentState}
            src={subBanner[i].src}
            backgroundColor={subBanner[i].backgroundColor}
            href={subBanner[i].href}
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
        <main>
          <section className="contents my-3">
            {this.createBoxContents()}
          </section>
        </main>
      </React.Fragment>
    )
  }
}
