import React from 'react'
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
  if (props.isReleased) {
    return <span className="badge badge-info">投稿済み</span>
  } else {
    return <span className="badge badge-secondary">下書き</span>
  }
}

const EditOrPreview = props => {
  const text = props.isReleased ? '投稿を見る' : '編集'
  return (
    <ColorButton
      className="py-1"
      style={{ fontSize: 11, width: 90 }}
      color="#B2B2B2"
    >
      {text}
    </ColorButton>
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

let id = 0
function createData(isReleased, name, createdAt, title, like, comment) {
  id += 1
  return { id, isReleased, name, createdAt, title, like, comment }
}

const data = [
  createData(
    true,
    '山本あきひろ',
    '2018/06/27 13:44',
    '南青山店がオープンしました',
    24,
    40
  ),
  createData(
    false,
    '橋本翔太',
    '2018/06/27 13:44',
    '南青山店がオープンしました',
    37,
    43
  ),
  createData(
    false,
    '山田花子',
    '2018/06/27 13:44',
    '南青山店がオープンしました',
    24,
    60
  ),
  createData(
    true,
    'Akihiro Yamamoto',
    '2018/06/27 13:44',
    '南青山店がオープンしました',
    67,
    43
  ),
  createData(
    true,
    'Gingerbread',
    '2018/06/27 13:44',
    '南青山店がオープンしました',
    49,
    39
  )
]

function SimpleTable(props) {
  const { classes } = props

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
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <DensedCell>
                  <StatusLabel isReleased={n.isReleased} />
                </DensedCell>
                <DensedCell component="th" scope="row">
                  {n.name}
                </DensedCell>
                <DensedCell>{n.createdAt}</DensedCell>
                <DensedCell>{`${n.title.slice(0, TITLE_LEN)}...`}</DensedCell>
                <DensedCell numeric>{n.like}</DensedCell>
                <DensedCell numeric>{n.comment}</DensedCell>
                <DensedCell>
                  <EditOrPreview isReleased={n.isReleased} />
                </DensedCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleTable)
