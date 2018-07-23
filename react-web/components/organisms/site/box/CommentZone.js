import React from 'react'
import { Link } from 'routes'
import Avatar from 'components/atoms/Avatar'

/**
 * コメント一覧表示ゾーン
 */
export default class CommentZone extends React.Component {
  render() {
    const props = this.props
    // 最初に見えてる件数を絞る。最初に20件とか撮ってくる必要ない HACK
    const INITIAL_NUM = 3
    const sliced = props.comments.slice(0, props.initialNum || INITIAL_NUM)
    const copiedArray = [...sliced].reverse()

    return (
      <div className={`comments w-100 mx-auto ${props.className || ''}`}>
        <div className="load my-3 text-center" onClick={() => {}}>
          以前のコメントを見る
        </div>
        <div className="commentsPost my-3 mb-5">
          {copiedArray.map((e, i) => (
            <div key={e.id} className="row justify-content-around my-3">
              <Avatar className="col-2 px-0" src={e.iconPath} />
              <div className="col-9 body">
                <Link route={`/view/mypage/${e.commenterId}`}>
                  <a>{e.name}</a>
                </Link>
                <div>{e.body}</div>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          a {
            color: #2b6eb2;
            font-weight: bold;
          }

          .load {
            color: #2b6eb2;
            font-size: 13px;
            cursor: pointer;
          }

          .commentsPost {
            font-size: 12px;
          }

          .body {
            background-color: #eff1f3;
            border-radius: 15px;
            padding: 10px 20px;
          }
        `}</style>
      </div>
    )
  }
}
