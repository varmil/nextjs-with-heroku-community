import React from 'react'
import Portal from '@material-ui/core/Portal'
import objectPath from 'object-path'
import { PATH_MAP } from 'reducers/site'
import FixedButton from 'components/atoms/FixedButton'
import BoxContent from 'components/organisms/site/BoxContent'
import CategorySelect from 'components/organisms/site/base/CategorySelect'

// TALK BOX系のベースクラス
export default class TalkRoomContents extends React.Component {
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

        {this.state.showPortal ? (
          <Portal container={document.body}>
            <FixedButton />
          </Portal>
        ) : null}

        <style jsx>{`
          .desc {
            border-bottom: solid gray 1px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
