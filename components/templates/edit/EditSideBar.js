import React from 'react'

const initialState = {}

export default class Stepper extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    return (
      <div className="row">
        <nav
          className="col-auto bg-faded sidebar"
          style={{ width: this.props.width }}
        >
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Overview <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Analytics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Export
              </a>
            </li>
          </ul>

          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Nav item
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Nav item again
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                One more nav
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Another nav item
              </a>
            </li>
          </ul>

          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Nav item again
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                One more nav
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Another nav item
              </a>
            </li>
          </ul>
        </nav>

        <style jsx>{`
          .sidebar {
            position: fixed;
            top: ${this.props.offsetTop}px;
            bottom: 0;
            left: 0;
            z-index: 1000;
            padding: 20px;
            overflow-x: hidden;
            overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
            border-right: 1px solid #eee;
          }

          .sidebar {
            padding-left: 0;
            padding-right: 0;
          }

          .sidebar .nav {
            margin-bottom: 20px;
          }

          .sidebar .nav-item {
            width: 100%;
          }

          .sidebar .nav-item + .nav-item {
            margin-left: 0;
          }

          .sidebar .nav-link {
            border-radius: 0;
          }

          .bg-faded {
            background-color: #f7f7f7;
          }
        `}</style>
      </div>
    )
  }
}
