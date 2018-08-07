import React from 'react'
// import fecha from 'fecha'
// import { connect } from 'react-redux'
import { Link, Router } from 'routes'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ColorButton from 'components/atoms/ColorButton'
import IconButton from '@material-ui/core/IconButton'
import { getWebServerDomain } from 'utils/API'
import Role from '/../shared/constants/Role'
import url from 'constants/URL'

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
    // minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

const getRealName = (lastName, firstName) => {
  if (!lastName && !firstName) {
    return ''
  }
  return lastName + ' ' + firstName
}

// 招待しただけで未参加ならTRUE。参加済みならFALSE
const isNotJoined = data => {
  return data.code
}

class AdminAccountTable extends React.Component {
  render() {
    const props = this.props
    const { classes, data } = props

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <DensedCell>名前</DensedCell>
                <DensedCell>メールアドレス</DensedCell>
                <DensedCell>権限</DensedCell>
                <DensedCell>リンクURL</DensedCell>
                <DensedCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => {
                return (
                  <TableRow key={n.email + n.id}>
                    <DensedCell component="th" scope="row">
                      {isNotJoined(n) ? (
                        <span className="text-secondary">招待中</span>
                      ) : (
                        getRealName(n.lastName, n.firstName)
                      )}
                    </DensedCell>
                    <DensedCell>{n.email}</DensedCell>
                    <DensedCell>{Role.Name[n.roleId]}</DensedCell>
                    {isNotJoined(n) ? (
                      <DensedCell>{`${getWebServerDomain()}${
                        url.SIGNUP_EMAIL
                      }/${n.code}`}</DensedCell>
                    ) : (
                      <DensedCell />
                    )}
                    {isNotJoined(n) ? (
                      <DensedCell />
                    ) : (
                      <DensedCell>
                        <Link route={`/admin/settings/account/edit/${n.id}`}>
                          <IconButton
                            style={{
                              position: 'relative',
                              top: 0,
                              left: 0,
                              fontSize: '0.9rem'
                            }}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </IconButton>
                        </Link>
                      </DensedCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    )
  }
}

AdminAccountTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AdminAccountTable)
