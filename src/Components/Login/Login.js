import React, { Component } from 'react';
import './Login.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginEmail: '',
      loginPassword: ''
    }
  }
  onEmailChange = (event) => {
    event.preventDefault();
    this.setState({ loginEmail: event.target.value })
  }

  onPasswordChange = (event) => {
    event.preventDefault();
    this.setState({ loginPassword: event.target.value })
  }

  onSubmitSignin = (event) => {
    event.preventDefault();
    const { loginEmail, loginPassword } = this.state;
    if (!loginEmail.trim() || !loginPassword.trim()) {
      return;
    }

    fetch('http://localhost:3001/signin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: this.state.loginEmail,
        password: this.state.loginPassword
      })
    })
      .then(resp => resp.json())
      .then(user => {
        if (user.id) {
          console.log(user)
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }

      })
  }

  render() {
    const { onRouteChange } = this.props
    return (<div className='mainDiv'>
      <article className="br2 tc ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 mt3">
        <main className="pa4 black-80">
          <form>
            <div className="measure">

              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    onChange={this.onEmailChange}
                    type="email"
                    name="email-address"
                    id="email-address" />
                </div>

                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    onChange={this.onPasswordChange}
                    type="password"
                    name="password"
                    id="password" />
                </div>
              </fieldset>

              <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib w-90"
                  type="submit"
                  value="Sign in"
                  onClick={this.onSubmitSignin} />
              </div>
              <div className="lh-copy mt3">
                <p onClick={() => { onRouteChange('register') }} className="f5 link dim black db pointer">Register</p>
              </div>
            </div>
          </form>
        </main>
      </article>
      </div>
    )
  }
}

export default Login