import React from 'react'
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
  constructor(props) {
    super(props)
    // work around for SSR
    // https://github.com/zeit/next.js/issues/1722
    this.state = { show: false }
  }

  componentDidMount() {
    this.setState({ ...this.state, show: true })
  }

  render() {
    if (!this.state.show) return null
    const props = this.props
    return (
      <React.Fragment>
        <Link href="">
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
