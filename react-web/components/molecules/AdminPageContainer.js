import React from 'react'
import ColorButton from 'components/atoms/ColorButton'
import { Link } from 'routes'

export const Container = props => {
  return (
    <div className="container py-4 mt-3">
      {props.children}
      <style jsx>{`
        .container {
          border: 1px solid #d0d0d0;
          background-color: white;
        }
      `}</style>
    </div>
  )
}

export const Header = props => {
  const LinkOrDiv = props =>
    props.route ? (
      <Link route={props.route} passHref>
        {props.children}
      </Link>
    ) : (
      <div>{props.children}</div>
    )

  return (
    <section className="borderB pageHeader text-center position-relative pb-3">
      <span className="title">{props.title}</span>
      {props.buttonText && (
        <LinkOrDiv route={props.route}>
          <a>
            <ColorButton
              className="addButton w-25"
              color="#2b6db2"
              style={{
                position: 'absolute',
                top: 3,
                right: 0,
                borderRadius: 18
              }}
              icon={<i className="fas fa-plus" />}
            >
              {props.buttonText}
            </ColorButton>
          </a>
        </LinkOrDiv>
      )}

      <style jsx>{`
        .borderB {
          border-bottom: 1px solid gray;
        }

        .title {
          font-size: 38px;
        }
      `}</style>
    </section>
  )
}

export class Filter extends React.Component {
  state = {
    keyword: ''
  }

  handleChange = name => event => {
    const value = event.target.value
    this.setState({
      [name]: value
    })
    this.props.onChange(value)
  }

  render() {
    return (
      <section className="borderB py-4">
        <div className="search input-group text-right">
          <input
            type="text"
            className="form-control border-right-0"
            placeholder={`キーワードを検索`}
            value={this.state.keyword}
            onChange={this.handleChange('keyword')}
          />
          <div className="input-group-append">
            <span className="input-group-text bg-white border-left-0">
              <i className="fas fa-search" />
            </span>
          </div>
        </div>

        <style jsx>{`
          .borderB {
            border-bottom: 1px solid gray;
          }

          .search {
            margin-left: auto;
            position: relative;
            top: 0;
            right: 0%;
            width: 30%;
          }
        `}</style>
      </section>
    )
  }
}
