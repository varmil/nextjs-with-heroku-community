export default props => {
  return (
    <div className="container py-4 mt-3">
      {props.children}
      <style jsx>{`
        .container {
          border: 1px solid #d0d0d0;
          background-color: white;
        }
      `}</style>
    </div>
  )
}
