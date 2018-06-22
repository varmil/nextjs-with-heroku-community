const Index = props => (
  <div>
    <img src={props.src} width="140" height="40" alt="logo" />

    <style jsx>{`
      img {
        object-fit: contain;
      }
    `}</style>
  </div>
)
export default Index
