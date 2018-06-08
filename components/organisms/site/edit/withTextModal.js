import React from 'react'
import omit from 'lodash/omit'

const OMIT_KEYS = ['className', 'style']

export default function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    onTriggerModal() {
      console.info('onTriggerModal')
    }

    render() {
      // omit specific keys
      const newProps = omit(this.props, OMIT_KEYS)
      return (
        <div className={`parent ${this.props.className || ''}`}>
          <WrappedComponent
            {...newProps}
            onTriggerModal={this.onTriggerModal.bind(this)}
          />

          <style jsx>{``}</style>
        </div>
      )
    }
  }
}
