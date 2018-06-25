import React from 'react'
import NewsPage from 'components/templates/edit_view_shared/NewsPage'
import PageDescription from 'components/organisms/site/base/PageDescription'
import PreInputForm from 'components/organisms/site/base/PreInputForm'
import CategorySelect from 'components/organisms/site/base/CategorySelect'

class News extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NewsPage
          {...this.props}
          pageDescription={PageDescription}
          preInputForm={PreInputForm}
          categorySelect={CategorySelect}
        />
      </React.Fragment>
    )
  }
}

export default News
