import React from "react";
import PropTypes from "prop-types";

const HeaderNavUserName = ({email})=>{
  console.log(`show head nav user` + email);
  return <nav className="header__nav">
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <a className="header__nav-link header__nav-link--profile" href="#">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{email}</span>
        </a>
      </li>
    </ul>
  </nav>;
};
HeaderNavUserName.propTypes = {
  email: PropTypes.string,
};
export default HeaderNavUserName;
