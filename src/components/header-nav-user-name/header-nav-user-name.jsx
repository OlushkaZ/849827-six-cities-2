import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const HeaderNavUserName = ({email})=>{
  console.log(`show head nav user` + email);
  return <nav className="header__nav">
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link to="/favorites" className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{email}</span>
        </Link>
      </li>
    </ul>
  </nav>;
};
HeaderNavUserName.propTypes = {
  email: PropTypes.string,
};
export default HeaderNavUserName;
