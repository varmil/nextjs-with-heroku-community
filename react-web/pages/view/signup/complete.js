import React from 'react'
import { Router } from 'routes'
import CenteredContainer from 'components/molecules/CenteredContainer'
import SignInUpHeader from 'components/molecules/SignInUpHeader'

const SHOW_DURATION_MS = 1000

class SignupComplete extends React.Component {
  componentDidMount() {
    setTimeout(async () => {
      await Router.pushRoute(`/view/welcome`)
    }, SHOW_DURATION_MS)
  }

  render() {
    return (
      <CenteredContainer height={200} center>
        <section>
          <SignInUpHeader text="アカウント登録完了" />
        </section>

        <section className="text-center mt-3">
          <i className="fas fa-check" />
        </section>

        <style jsx>{`
          i {
            font-size: 70px;
            color: #2b6eb2;
          }
        `}</style>
      </CenteredContainer>
    )
  }
}

export default SignupComplete
