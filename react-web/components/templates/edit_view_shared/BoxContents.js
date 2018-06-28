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
    return (
      <div className="wrap">
        <div className="c">
          <BoxContent />
        </div>
        <div className="c">
          <BoxContent />
        </div>

        <div className="subBanner my-3">{this.createSubBanners()}</div>

        <div className="c">
          <BoxContent />
        </div>

        <style jsx>{`
          .wrap {
          }

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

        <style jsx>{`
          .desc {
            border-bottom: solid gray 1px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
