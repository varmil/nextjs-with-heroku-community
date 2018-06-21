import React from 'react'
import range from 'lodash/range'
import Link from 'next/link'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    // border: 'none',
    width: 190,
    margin: '0 auto',
    fontSize: 12
  })
}

const initialState = {}

export default class CategorySelect extends React.Component {
  render() {
    const props = this.props
    return (
      <React.Fragment>
        <Link>
          <Select
            placeholder={'全カテゴリ'}
            styles={colourStyles}
            options={options}
            isSearchable={false}
          />
        </Link>
      </React.Fragment>
    )
  }
}
