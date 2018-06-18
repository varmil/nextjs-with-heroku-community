import React from 'react'
import Link from 'next/link'
import AdminHeader from 'components/organisms/AdminHeader'
import WhiteBreadcrumb from 'components/organisms/WhiteBreadcrumb'
import CommonFooter from 'components/organisms/CommonFooter'

const initialState = {}

function Card(props) {
  return (
    <div className={`card rounded-0 ${props.className}`}>
      <img
        className="card-img-top"
        src="https://www.webtoolnavi.com/www/wp-content/uploads/2016/06/fakeimg-2.png"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{props.title || 'Template'}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </p>
        <Link href="/admin/site/edit">
          <div className="btn btn-primary w-100">このデザインにする</div>
        </Link>
      </div>

      <style jsx>{`
        p {
          font-size: 13px;
        }

        .card-img-top {
          border-radius: 0;
        }
      `}</style>
    </div>
  )
}

// TODO: stub
const cardList = [
  <Card key={'cc1'} />,
  <Card key={'cc2'} />,
  <Card key={'cc3'} />,
  <Card key={'cc4'} />,
  <Card key={'cc5'} />,
  <Card key={'cc6'} />
]

export default class Stepper extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  render() {
    return (
      <div>
        <AdminHeader />

        <WhiteBreadcrumb>
          <li className="breadcrumb-item active">サイトデザイン</li>
        </WhiteBreadcrumb>

        <div style={{ backgroundColor: 'whitesmoke' }}>
          <div className="container" style={{ paddingTop: 40 }}>
            <div className="contentWrapper mx-auto text-center">
              <i
                className="far fa-check-circle text-secondary mb-4"
                style={{ fontSize: 80 }}
              />

              <h2 className="mb-3">サイトのデザインテーマを選ぼう！</h2>
              <h6 className="text-secondary mb-5">
                テーマは後からカスタムすることができます
              </h6>
            </div>

            <div className="row mb-5">
              {cardList.map((card, i) => (
                <div className="col-6 my-3" key={`templatesDiv${i}`}>
                  {card}
                </div>
              ))}
            </div>
          </div>

          <CommonFooter />

          <style jsx>{`
            .contentWrapper {
            }

            button {
              padding: 10px 150px;
              background: #2b6db2;
            }
          `}</style>
        </div>
      </div>
    )
  }
}
