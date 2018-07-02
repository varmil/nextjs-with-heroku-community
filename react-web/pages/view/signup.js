import React from 'react'
import { Link } from 'routes'
import RoundWideButton from 'components/atoms/RoundWideButton'
import CenteredContainer from 'components/molecules/CenteredContainer'

const btnStyle = {
  width: '100%'
}

export default class SignUp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CenteredContainer height={400}>
          <section className="">
            <img src="/static/img/logo.png" />
          </section>

          <section className="mt-4">
            <RoundWideButton
              className="my-2"
              style={btnStyle}
              color={'#2b6db2'}
              icon={<i className="fab fa-facebook-f" />}
            >
              Facebookで登録
            </RoundWideButton>
            <RoundWideButton
              className="my-2"
              style={btnStyle}
              color={'#2b6db2'}
              icon={<i className="fab fa-twitter" />}
            >
              Twitterで登録
            </RoundWideButton>
          </section>

          <section className="my-2">
            <img src="/static/img/login-or-big.png" />
          </section>

          <section className="">
            <Link route={'/view/signup/email'} passHref>
              <a>
                <RoundWideButton
                  className="my-2"
                  style={btnStyle}
                  color={'gray'}
                  icon={<i className="fab fa-facebook-f" />}
                >
                  メールアドレスで登録
                </RoundWideButton>
              </a>
            </Link>
          </section>

          <section className="login mt-3 text-center">
            <Link route="/view/signin">
              <a>ログイン</a>
            </Link>
          </section>
        </CenteredContainer>

        <style jsx>{`
          img {
            width: 100%;
          }

          .login a {
            color: #909090;
            text-decoration: underline;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
