import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form, Image, Navbar, Container, InputGroup } from '@themesberg/react-bootstrap';

export default () => {
  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
          {/* Right side completely removed (notifications + profile) */}
        </div>
      </Container>
    </Navbar>
  );
};
