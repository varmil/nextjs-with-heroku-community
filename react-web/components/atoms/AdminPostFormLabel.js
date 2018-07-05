export default props => (
  <label>
    {props.children}
    <style jsx>{`
      label {
        color: #707070;
      }
    `}</style>
  </label>
)
