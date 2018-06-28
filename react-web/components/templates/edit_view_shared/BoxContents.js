import React from 'react'
import BoxContent from 'components/organisms/site/BoxContent'
import CategorySelect from 'components/organisms/site/base/CategorySelect'

// TALK BOX系のベースクラス
export default class BoxContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showPortal: false }
  }

  componentDidMount() {
    this.setState({ showPortal: true })
  }

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
  // onSaveCategory(state) {}

  /**
   * Edit Handler END
   */

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <main>
          {/* {this.createCategorySelect()} */}

          <section className="contents container">
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
