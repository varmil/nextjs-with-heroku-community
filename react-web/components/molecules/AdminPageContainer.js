export default props => {
  return (
    <div className="container py-4 mt-3">
      {props.children}
      <style jsx>{`
        .container {
          background-color: white;
        }
      `}</style>
    </div>
  )
}
