import React from 'react'
import ReactHashtag from 'react-hashtag'
import { Link } from 'routes'
import reactStringReplace from 'react-string-replace'

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

export default class MultiLineHashtagMentionText extends React.Component {
  render() {
    const renderTexts = () => {
      if (typeof this.props.children === 'string') {
        const arr = this.props.children.split('\n')

        return arr.map((text, i) => {
          let replacedText = reactStringReplace(text, /@(\w+)/g, (match, n) => (
            <Link key={match + n} route={`/view/mypage/${match}`} passHref>
              <a className="hashtag">@{match}</a>
            </Link>
          ))

          replacedText = reactStringReplace(
            replacedText,
            /([#|＃][^\s]+)/g,
            (hashtagValue, n) => (
              <Link
                key={hashtagValue + i}
                route={`/view/search/result/${encodeURIComponent(
                  hashtagValue
                )}`}
                passHref
              >
                <a className="hashtag">{hashtagValue}</a>
              </Link>
            )
          )
          return (
            <span key={i}>
              {/* 改行もハッシュタグもテキスト --> ReactComponent へ変換するので、ここでまとめて */}
              {/* TODO リンクURL修正する */}
              {replacedText}
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
