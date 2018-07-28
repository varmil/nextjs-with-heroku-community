import LinearProgress from '@material-ui/core/LinearProgress'

export default props => {
  const { nowLoading, hasMore, onClick } = props

  // 全コメント表示済みなら何も出さない
  if (!hasMore) return null

  // loading表示
  if (nowLoading) {
    return (
      <div className="text-center">
        <LinearProgress />
      </div>
    )
  }

  return (
    <div className="load my-3 text-center" onClick={onClick}>
      以前のコメントを見る
      <style jsx>{`
        .load {
          color: #2b6eb2;
          font-size: 13px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
