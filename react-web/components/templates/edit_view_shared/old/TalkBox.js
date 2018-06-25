import React from 'react'
import BoxHeader from 'components/organisms/site/base/BoxHeader'
import Header from 'components/templates/container/Header'
import PostSortButtons from 'components/molecules/PostSortButtons'
import BoxContent from 'components/organisms/site/BoxContent'

// TALK BOX系のベースクラス
export default class TalkBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
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
            width: 90%;
            margin: 0 auto;
          }

          .c {
            margin: 20px 0;
          }
        `}</style>
      </div>
    )
  }

  createInputForm() {
    const props = this.props
    const pageData = props.pageData
    // NEWSなど投稿ができないページは表示しない
    if (!pageData.inputForm) return null

    return (
      <section className="inputForm container py-3 my-1">
        <props.preInputForm
          href={''}
          text={pageData.inputForm.text}
          onSave={this.onSaveInputForm.bind(this)}
        />
      </section>
    )
  }

  /**
   * NOTE: override these, Edit Handler START
   */
  onSaveDesc(state) {}

  onSaveInputForm(state) {}

  onSaveCategory(state) {}

  /**
   * Edit Handler END
   */

  render() {
    const props = this.props
    const pageData = props.pageData

    return (
      <React.Fragment>
        <Header edit={props.edit} />

        <main>
          <section className="">
            <BoxHeader
              icon={false}
              defaultText={props.boxHeader.defaultText}
              contentState={props.boxHeader.contentState}
              src={props.boxHeader.src}
              backgroundColor={props.boxHeader.backgroundColor}
            />
          </section>

          <section className="desc container py-3 my-1">
            <props.pageDescription
              text={pageData.desc.text}
              onSave={this.onSaveDesc.bind(this)}
            />
          </section>

          {this.createInputForm()}

          <section className="cat container pt-3 mt-1">
            <props.categorySelect
              item={pageData.categories.item}
              onSave={this.onSaveCategory.bind(this)}
            />
          </section>

          <section className="contents container py-3 my-1">
            <PostSortButtons />

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
