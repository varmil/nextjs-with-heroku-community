import Classes from 'constants/Classes'
import { SiteCommon } from 'constants/ActionTypes'

const Index = props => (
  <div
    className={`${Classes.EDITABLE} ${props.className}`}
    data-modal={`ImageModal`}
    data-action={SiteCommon.SET_LOGO}
    data-path={props.propsPath}
  >
    <img src={props.src} height="40" alt="logo" />

    <style jsx>{`
      img {
        width: 100%;
        object-fit: contain;
      }
    `}</style>
  </div>
)
export default Index
