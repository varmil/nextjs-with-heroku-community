import React from 'react'
import fecha from 'fecha'
// import { connect } from 'react-redux'
import { Link } from 'routes'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ColorButton from 'components/atoms/ColorButton'

const TITLE_LEN = 11

const StatusLabel = props => {
  if (props.released) {
    return <span className="badge badge-info">投稿済み</span>
  } else {
    return <span className="badge badge-secondary">下書き</span>
  }
}

const EditOrPreview = props => {
  const text = props.released ? '投稿を見る' : '編集'
  return (
    <Link route={`/admin/post/add/${props.boxType}/${props.postId}`} passHref>
      <a>
        <ColorButton
          className="py-1"
          style={{ fontSize: 11, width: 90 }}
          color="#B2B2B2"
        >
          {text}
        </ColorButton>
      </a>
    </Link>
  )
}

const DensedCell = props => (
  <TableCell {...props} padding="dense">
    {props.children}
  </TableCell>
)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    boxShadow: 'none'
  },
  table: {
    minWidth: 700
  }
})

class SimpleTable extends React.Component {
  render() {
    const props = this.props
    const { classes, posts } = props

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <DensedCell />
              <DensedCell>投稿者</DensedCell>
              <DensedCell>投稿日時</DensedCell>
              <DensedCell>タイトル</DensedCell>
              <DensedCell numeric>いいね！</DensedCell>
              <DensedCell numeric>コメント</DensedCell>
              <DensedCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map(n => {
              return (
                <TableRow key={n.id}>
                  <DensedCell>
                    <StatusLabel released={n.released} />
                  </DensedCell>
                  <DensedCell component="th" scope="row">
                    {n.name}
                  </DensedCell>
                  <DensedCell>
                    {fecha.format(new Date(n.createdAt), 'YYYY-MM-DD hh:mm')}
                  </DensedCell>
                  <DensedCell>{`${n.title.slice(0, TITLE_LEN)}...`}</DensedCell>
                  <DensedCell numeric>{n.like}</DensedCell>
                  <DensedCell numeric>{n.comment}</DensedCell>
                  <DensedCell>
                    <EditOrPreview
                      released={n.released}
                      boxType={n.boxType}
                      postId={n.id}
                    />
                  </DensedCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleTable)
