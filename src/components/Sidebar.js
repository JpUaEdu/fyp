import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faHandHoldingUsd, faCog, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Nav, Button, Accordion, Navbar, Image } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = ({ eventKey, title, icon, children = null }) => {
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = ({ title, link, icon }) => {
    const navItemClassName = link === pathname ? "active" : "";
    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link as={Link} to={link}>
          {icon && <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>}
          <span className="sidebar-text">{title}</span>
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>

      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
<div className="user-card d-flex align-items-center justify-content-between pb-4">
              <div className="d-flex align-items-center">
                <div className="d-block">
                  <Button
  variant="secondary"
  size="xs"
  className="text-dark"
  onClick={() => {
    localStorage.removeItem("token"); // Clear JWT
    window.location.href = "/signin"; // Redirect to login
  }}
>
  Sign Out
</Button>

                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                ×
              </Nav.Link>
            </div>

            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Volt React" link={Routes.Presentation.path} icon={null} />
              <NavItem title="Overview" link={Routes.DashboardOverview.path} icon={faChartPie} />
              <NavItem title="Transactions" link={Routes.Transactions.path} icon={faHandHoldingUsd} />
              <NavItem title="Input" link={Routes.UserInput.path} icon={faCog} />

              <CollapsableNavItem eventKey="examples/" title="Page Examples" icon={faFileAlt}>
                <NavItem title="Sign In" link={Routes.Signin.path} />
                <NavItem title="Sign Up" link={Routes.Signup.path} />
                <NavItem title="Forgot password" link={Routes.ForgotPassword.path} />
                <NavItem title="Reset password" link={Routes.ResetPassword.path} />
                <NavItem title="Lock" link={Routes.Lock.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem title="500 Server Error" link={Routes.ServerError.path} />
              </CollapsableNavItem>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
