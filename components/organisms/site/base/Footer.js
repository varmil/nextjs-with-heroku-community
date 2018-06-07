import Color from 'constants/Color'

const Index = props => (
  <footer className="text-white font-weight-bold">
    <div className="text-center">Copyright 2018 Dayone</div>

    <style jsx>{`
      footer {
        height: 100px;
        line-height: 100px;
        background-color: ${Color.MAIN_BLUE};
      }
    `}</style>
  </footer>
)
export default Index
