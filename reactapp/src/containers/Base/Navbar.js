import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./index.css";

export default class TopMenu extends Component {
  
  handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    return (
      <div className="header">
        <div className="navbar">

        <ul>
              <li className="nav-item">
                <NavLink to="/AddPayment/">
                Add Payment
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Archive/">
                Archive
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/Analysis/">
                Analysis
                </NavLink>
              </li>
            </ul>

          <div className="logout">
        
            <ul>
              <li>
                <a onClick={this.handleLogout}>Log out</a>
              </li>
            </ul>

          </div>
        </div>
      </div>
    );
  }
}
