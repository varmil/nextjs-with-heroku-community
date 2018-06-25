import React from 'react'
import Portal from '@material-ui/core/Portal'
import FixedButton from 'components/atoms/FixedButton'
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
      <section className="cat mt-3">
        <props.categorySelect
          item={props.pageData.categories.item}
          onSave={this.onSaveCategory.bind(this)}
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
        <div className="c">
          <BoxContent />
        </div>

        <style jsx>{`
          .wrap {
          }

          .c {
            margin: 0 0 20px;
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

          <section className="contents container">
            {this.createBoxContents()}
          </section>
        </main>

        <Portal container={document.body}>
          <FixedButton />
        </Portal>

        <style jsx>{`
          .desc {
            border-bottom: solid gray 1px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
