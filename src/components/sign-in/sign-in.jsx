import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from '../../reducer/reducer';
import {useHistory} from "react-router-dom";
const SignIn = (props)=>{
  const {onButtonClick, state, handleInputChange} = props;
  const emailInput = React.createRef();
  const passInput = React.createRef();

  const history = useHistory();
  const HandleButtonClick = ()=>{
    if (state.email && state.password) {
      onButtonClick(state.email, state.password);
      history.push(`/`);
    } else {
      if (!state.email) {
        emailInput.current.focus();
      } else {
        passInput.current.focus();
      }
    }
  };

  const submit = (e)=>{
    e.preventDefault();
  };

  return <div className="page page--gray page--login">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="main.html">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">Sign in</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="/" method="post" onSubmit={submit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" value={state.email} onChange={handleInputChange} ref={emailInput}/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" value={state.password} onChange={handleInputChange} ref={passInput}/>
            </div>
            <button className="login__submit form__submit button" onClick = {HandleButtonClick} type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  </div>;
};
SignIn.propTypes = {
  onButtonClick: PropTypes.func,
  handleInputChange: PropTypes.func,
  state: PropTypes.object,
};

const mapDispatchToProps = (dispatch)=>({
  onButtonClick: (email, pas)=>{
    dispatch(Operation.login({
      email,
      password: pas
    }));
  }
});
export {SignIn};
export default connect(null, mapDispatchToProps
)(SignIn);
