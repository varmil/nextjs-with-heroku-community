import React from 'react'
import fecha from 'fecha'
// import { connect } from 'react-redux'
import { Router } from 'routes'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import Invitation from '/../shared/constants/Invitation'
import { getInvivationURL } from 'constants/URL'

const StatusLabel = props => {
  if (props.status === Invitation.NOT_SEND) {
    return <span className="badge badge-info">未送付</span>
  } else if (props.status === Invitation.NOT_JOINED) {
    return <span className="badge badge-secondary">未参加</span>
  } else if (props.status === Invitation.JOINED) {
    return <span className="badge badge-info">参加済</span>
  }
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
    boxShadow: 'none'
  },
  table: {
    minWidth: 920
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
    const { classes, data, count, page, rowsPerPage, brandType } = props

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <DensedCell />
                <DensedCell>メールアドレス</DensedCell>
                <DensedCell>招待リンク作成日</DensedCell>
                <DensedCell>参加日</DensedCell>
                <DensedCell>リンクURL</DensedCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => {
                return (
                  <TableRow key={n.id}>
                    <DensedCell>
                      <StatusLabel status={n.status} />
                    </DensedCell>
                    <DensedCell>{n.email}</DensedCell>
                    <DensedCell>
                      {fecha.format(
                        new Date(n.createdAt || null),
                        'YYYY-MM-DD'
                      )}
                    </DensedCell>
                    <DensedCell>
                      {n.joinedAt
                        ? fecha.format(new Date(n.joinedAt), 'YYYY-MM-DD')
                        : null}
                    </DensedCell>
                    <DensedCell>
                      {getInvivationURL(n.code, brandType)}
                    </DensedCell>
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
