import React from 'react'

export default class MenuAddEdit extends React.Component {
  render() {
    const props = this.props

    return (
      <React.Fragment>
        <div id="editNav_add" className="editNav_add">
          <div
            id="editNav_addBtn"
            className="editNav_addBtn"
            onClick={props.onClick}
          >
            <i className="fa fa-plus" />
          </div>
          <div className="editNav_addTooltip">メニューを追加</div>
        </div>

        <style jsx>{`
          .editNav_add {
            position: relative;
            text-align: center;
            margin: 10px;
          }

          .editNav_addBtn {
            position: relative;
            display: inline-block;
            z-index: 10;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #0090a1;
            text-align: center;
            box-shadow: 0 2px 6px rgba(100, 100, 100, 0.8);
            cursor: pointer;
          }

          .editNav_addBtn:hover + .editNav_addTooltip {
            opacity: 1;
            -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';
          }

          .editNav_addBtn > i {
            color: #fff;
            font-size: 15px;
            line-height: 30px;
          }

          .editNav_addTooltip {
            opacity: 0;
            -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
            position: absolute;
            top: 38px;
            left: 50%;
            z-index: 20;
            width: 100px;
            margin-left: -50px;
            padding: 10px 0;
            background-color: #332c1f;
            border-radius: 3px;
            font-size: 12px;
            text-align: center;
            color: #fff;
            transition: all 0.25s ease;
          }

          .editNav_addTooltip:after {
            content: '';
            position: absolute;
            top: -8px;
            left: 42px;
            border-bottom: 8px solid #332c1f;
            border-right: 8px solid transparent;
            border-left: 8px solid transparent;
          }

          .editNav_add:after {
            content: '';
            display: block;
            position: absolute;
            top: 15px;
            width: 100%;
            border-top: 1px solid #ccc;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
