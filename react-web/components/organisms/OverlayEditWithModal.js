import React from 'react'
import { connect } from 'react-redux'
import withModalFactory from 'components/organisms/site/edit/withModalFactory'
import { createAction } from 'redux-actions'
import { SiteState } from 'constants/ActionTypes'
import OverlayEdit from 'components/organisms/OverlayEdit'
import objectPath from 'object-path'
import { postMessage } from 'actions/iframe'
import IFrame from 'constants/IFrame'

class OverlayEditWithModal extends React.Component {
  constructor(props) {
    super(props)
    this.ComposedOverlay = withModalFactory(OverlayEdit, props.attr.modal)
  }

  render() {
    const { attr, rect, site, iWindow, dispatch } = this.props

    const style = {
      position: 'absolute',
      height: rect.height,
      width: rect.width,
      top: rect.top,
      left: rect.left
    }

    // bind modal and action that is triggered onSave
    const actionMethod = createAction(attr.action)
    const modalProps = objectPath.get(site, attr.path)

    return (
      <this.ComposedOverlay
        containerStyle={style}
        modalProps={modalProps}
        // state    : object    Modalで編集したstate
        // action   : string    起動するAction
        // index    : int       WrappedComponentが配列で管理される場合のIndex
        onSave={state => {
          // Redux guarantees the store has received the next state before accepting the next action
          // https://github.com/reduxjs/redux/issues/1199
          console.log('ONSAVE', state, attr.action, attr.index)

          // update state.site, then post current state.site entirely
          const action = actionMethod({ ...state, index: attr.index })
          dispatch(createAction(SiteState.SAVE_REQUEST)({ action }))

          // pass the same action to iframe
          dispatch(
            postMessage({
              iWindow,
              type: IFrame.EVENT_TYPE_ONSAVE,
              payload: action
            })
          )
        }}
      />
    )
  }
}
export default connect(state => ({
  site: state.site
}))(OverlayEditWithModal)
