const Index = props => (
  <div style={props.style}>
    <input
      type={props.type || 'text'}
      className={`form-control ${props.className}`}
    />

    <style jsx>{`
      input {
        height: 50px;
        border-radius: 0px;
      }
    `}</style>
  </div>
)
export default Index
