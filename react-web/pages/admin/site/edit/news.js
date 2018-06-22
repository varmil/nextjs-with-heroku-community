import React from 'react'
import Edit from 'components/templates/Edit'
import NewsPage from 'components/templates/edit_view_shared/NewsPage'
import PageDescription from 'components/organisms/site/edit/PageDescription'
import PreInputForm from 'components/organisms/site/edit/PreInputForm'
import CategorySelect from 'components/organisms/site/edit/CategorySelect'

class EditNews extends React.Component {
  render() {
    return (
      <Edit>
        <NewsPage
          {...this.props}
          edit={true}
          pageDescription={PageDescription}
          preInputForm={PreInputForm}
          categorySelect={CategorySelect}
        />
      </Edit>
    )
  }
}

export default EditNews
