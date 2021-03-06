// import React from 'react'
//
// // ここは汎用Modal処理のみ書いておいて、外からどのモーダルを展開するか渡す感じ
// // Modalと連携するPropsは、ここでnewPropsとしてWrappedComponentへ注入する
// // Modalの第２引数は、stateとnewPropsをmergeするイメージか。
// export default function ppHOC(WrappedComponent, modal) {
//   return class PP extends React.Component {
//     constructor(props) {
//       super(props)
//       this.state = { isOpen: false }
//
//       // create here because we need to know props keys
//       this.modal = React.createElement(modal)
//       // console.info('parent props', this.props)
//       // console.info('modal props', this.modal.props)
//     }
//
//     onTriggerModal() {
//       this.setState({ ...this.state, isOpen: true })
//     }
//
//     toggle() {
//       this.setState({ ...this.state, isOpen: !this.state.isOpen })
//     }
//
//     render() {
//       return (
//         <React.Fragment>
//           <WrappedComponent
//             {...this.props}
//             onTriggerModal={this.onTriggerModal.bind(this)}
//           />
//
//           {/* handle custom modal */}
//           {(() =>
//             React.cloneElement(this.modal, {
//               ...this.props,
//               ...this.state,
//               toggle: this.toggle.bind(this)
//             }))()}
//         </React.Fragment>
//       )
//     }
//   }
// }
