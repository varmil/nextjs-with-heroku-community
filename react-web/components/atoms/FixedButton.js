import Classes from 'constants/Classes'
import { Link } from '/routes'
import { SiteCommon } from 'constants/ActionTypes'
import { PATH_MAP } from 'reducers/site'

export default props => (
  <div
    className={`fixed-action-btn ${Classes.EDITABLE} ${props.className}`}
    data-modal={`BGColorModal`}
    data-action={SiteCommon.SET_BG_COLOR}
    data-path={`${PATH_MAP.COLOR}`}
  >
    <Link route={'/view/editpost'}>
      <div className="btn-floating btn-lg red waves-effect waves-light">
        <i className="fas fa-pen" />
      </div>
    </Link>

    <style jsx>{`
      .fixed-action-btn {
        position: fixed;
        z-index: 998;
        bottom: 5px;
        right: 5px;
        margin-bottom: 0;
      }

      .btn-floating {
        box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18),
          0 4px 15px 0 rgba(0, 0, 0, 0.15);
        position: relative;
        z-index: 1;
        vertical-align: middle;
        display: inline-block;
        overflow: hidden;
        transition: all 0.2s ease-in-out;
        margin: 10px;
        border-radius: 50%;
        padding: 0;
        cursor: pointer;
      }

      .btn-floating.btn-lg {
        width: 61.1px;
        height: 61.1px;
        background-color: ${props.backgroundColor || '#dc3545'};
      }

      .waves-effect,
      .waves-light {
        display: inline-block;
      }

      .btn-floating.btn-lg i {
        font-size: 1.625rem;
        line-height: 61.1px;
      }

      .btn-floating i {
        display: inline-block;
        width: inherit;
        text-align: center;
        color: ${props.color || '#fff'};
      }
    `}</style>
  </div>
)
