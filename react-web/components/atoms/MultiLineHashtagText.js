import React from 'react'
import ReactHashtag from 'react-hashtag'
import { Link } from 'routes'

export function getMultiLineHTML(string) {
  if (typeof string === 'string') {
    const arr = string.split('\n')
    return arr
      .map(
        (m, i) => `
        <span>
          ${m}
          ${i !== arr.length - 1 ? '<br />' : ''}
        </span>
      `
      )
      .join('')
  } else {
    return ''
  }
}

export default class MultiLineHashtagText extends React.Component {
  render() {
    const renderTexts = () => {
      if (typeof this.props.children === 'string') {
        const arr = this.props.children.split('\n')

        return arr.map((text, i) => {
          return (
            <span key={i}>
              {/* 改行もハッシュタグもテキスト --> ReactComponent へ変換するので、ここでまとめて */}
              {/* TODO リンクURL修正する */}
              <ReactHashtag
                renderHashtag={hashtagValue => (
                  <Link
                    key={hashtagValue + i}
                    route={`/view/home/${hashtagValue}`}
                    passHref
                  >
                    <a className="hashtag">{hashtagValue}</a>
                  </Link>
                )}
              >
                {text}
              </ReactHashtag>
              {i !== arr.length - 1 ? <br /> : ''}
            </span>
          )
        })
      } else {
        return ''
      }
    }
    return <React.Fragment>{renderTexts()}</React.Fragment>
  }
}
