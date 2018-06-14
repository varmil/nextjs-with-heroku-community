import React from 'react'
import range from 'lodash/range'

export default class Footer extends React.Component {
  render() {
    const props = this.props

    // 1列あたり5アイテム
    const rowNumber = Math.ceil(props.item.length / 5)
    const rows = range(rowNumber).map(i => (
      <div key={i} className="col-xs-12 col-sm-4 col-md-4">
        <ul className="list-unstyled quick-links">
          {props.item.slice(5 * i, 5 * (i + 1)).map((e, i) => (
            <li key={i}>
              <a href="javascript:void();">
                {/* <i className="fa fa-angle-double-right" /> */}
                {e.text}
              </a>
            </li>
          ))}
        </ul>

        <style jsx>{`
          ul.quick-links li {
            padding: 3px 0;
            -webkit-transition: 0.5s all ease;
            -moz-transition: 0.5s all ease;
            transition: 0.5s all ease;
          }

          ul.quick-links li:hover {
            padding: 3px 0;
            margin-left: 5px;
            font-weight: 700;
          }

          ul.quick-links li a i {
            margin-right: 5px;
          }

          ul.quick-links li:hover a i {
            font-weight: 700;
          }
        `}</style>
      </div>
    ))

    return (
      <footer id="footer">
        <div className="container">
          <div className="rowsWrap row justify-content-center">{rows}</div>

          <div className="row">
            <div className="col-12 mt-2 mt-sm-2 text-center text-white">
              <p className="h6">
                <a className="text-green ml-2" href="#">
                  2018 Dayone All right Reversed.
                </a>
              </p>
            </div>
            <hr />
          </div>
        </div>

        <style global jsx>{`
          #footer {
            height: auto;
            min-height: 100px;
            background-color: ${props.style.backgroundColor};
            padding: 35px 0 30px;
          }

          #footer a {
            color: ${props.style.color};
            text-decoration: none;
          }

          #footer .rowsWrap {
            text-align: ${props.style.textAlign};
          }
        `}</style>
      </footer>
    )
  }
}
