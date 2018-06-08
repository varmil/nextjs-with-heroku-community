import React from 'react'
import compose from 'lodash/fp/compose'
import toEditable from './Editable'
import withModal from './withModal'
import Modal from 'components/templates/site/edit/LinkedImageModal'
import MenuItem from 'components/organisms/site/base/MenuItem'

const Composed = compose(
  c => withModal(c, Modal),
  toEditable
)(MenuItem)
const Index = props => (
  <Composed
    {...props}
    className={`d-inline-block`}
    headerText={'テキスト編集'}
  />
)
export default Index
