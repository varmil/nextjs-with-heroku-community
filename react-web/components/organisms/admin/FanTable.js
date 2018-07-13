import React from 'react'
import fecha from 'fecha'
// import { connect } from 'react-redux'
import { Link, Router } from 'routes'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import ColorButton from 'components/atoms/ColorButton'
import Avatar from 'components/atoms/Avatar'

const DensedCell = props => (
  <TableCell {...props} padding="dense">
    {props.children}
  </TableCell>
)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    boxShadow: 'none'
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

class FanTable extends React.Component {
  // NOTE: our page count starts with 1, not 0
  handleChangePage = async (event, page) => {
    const nextPage = page + 1
    await Router.pushRoute(`/admin/fan/list/${nextPage}`)
  }

  // handleChangeRowsPerPage = event => {
  //   this.setState({ ...this.state, rowsPerPage: event.target.value })
  // }

  render() {
    const props = this.props
    const { classes, fans, count, page, rowsPerPage } = props

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <DensedCell>プロフィール画像</DensedCell>
                <DensedCell>ユーザ名</DensedCell>
                <DensedCell>メールアドレス</DensedCell>
                <DensedCell>参加年月</DensedCell>
                <DensedCell>最終ログイン</DensedCell>
                <DensedCell numeric>熱量指数</DensedCell>
                <DensedCell numeric>投稿数</DensedCell>
                <DensedCell numeric>いいね数</DensedCell>
                <DensedCell numeric>コメント数</DensedCell>
                <DensedCell numeric>バッジ数</DensedCell>
                <DensedCell numeric>イベント参加</DensedCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fans.map(n => {
                return (
                  <TableRow key={n.id}>
                    <DensedCell>
                      <Avatar src={n.iconPath} size={40} />
                    </DensedCell>
                    <DensedCell component="th" scope="row">
                      {n.nickname || `${n.lastName} ${n.firstName}`}
                    </DensedCell>
                    <DensedCell>{n.email}</DensedCell>
                    <DensedCell>
                      {fecha.format(new Date(n.createdAt || null), 'YYYY-MM')}
                    </DensedCell>
                    <DensedCell>
                      {fecha.format(
                        new Date(n.lastLoginedAt || null),
                        'YYYY-MM-DD'
                      )}
                    </DensedCell>
                    <DensedCell numeric>{n.loyalty}</DensedCell>
                    <DensedCell numeric>{n.post}</DensedCell>
                    <DensedCell numeric>{n.like}</DensedCell>
                    <DensedCell numeric>{n.comment}</DensedCell>
                    <DensedCell numeric>{n.badge}</DensedCell>
                    <DensedCell numeric>{n.event}</DensedCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
          // zero-start
          page={page - 1}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
        />
      </Paper>
    )
  }
}

FanTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FanTable)
