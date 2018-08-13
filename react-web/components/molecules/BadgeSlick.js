import { Badge } from '/../shared/constants/Badge'

export default props => (
  <div>
    <div className="row justify-content-center">
      {props.chunk.map((e, i) => (
        <div key={0 + i} className="badge col-3 py-2 px-0">
          <img
            src={`/static/img/badge/png/${Badge[e.badgeType].imgname}0${
              e.level
            }.png`}
          />
        </div>
      ))}
    </div>

    <style jsx>{`
      .row {
        width: 80%;
        margin: 0 auto;
      }

      .badge img {
        width: 100%;
        object-fit: cover;
      }
    `}</style>
  </div>
)
