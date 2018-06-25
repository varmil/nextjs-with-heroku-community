import React from 'react'
import BoxContent from 'components/organisms/site/BoxContent'

// TALK BOX系のベースクラス
export default class TalkRoomContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  createCategorySelect() {
    const props = this.props
    if (!props.categorySelect) return null
    return (
      <section className="cat container pt-3 mt-1">
        <props.categorySelect
          item={props.pageData.categories.item}
          onSave={this.onSaveCategory.bind(this)}
        />
      </section>
    )
  }

  createBoxContents() {
    return (
      <div className="wrap my-4">
        <div className="c">
          <BoxContent />
        </div>
        <div className="c">
          <BoxContent />
        </div>
        <div className="c">
          <BoxContent />
        </div>

        <style jsx>{`
          .wrap {
            width: 100%;
            margin: 0 auto;
          }

          .c {
            margin: 20px 0;
          }
        `}</style>
      </div>
    )
  }

  /**
   * NOTE: override these, Edit Handler START
   */
  onSaveCategory(state) {}

  /**
   * Edit Handler END
   */

  render() {
    const props = this.props

    return (
      <React.Fragment>
        <main>
          {this.createCategorySelect()}

          <section className="contents container py-3 my-1">
            {this.createBoxContents()}
          </section>
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
