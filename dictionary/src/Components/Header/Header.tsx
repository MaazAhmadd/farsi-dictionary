import React from 'react';
import './style.scss';
import { Container, Row, Col } from 'reactstrap';
import Logo from '../../Images/logoipsum.svg';
import { Link } from 'react-router-dom';

const Header: React.FunctionComponent = () => {
  return (
    <Container style={{ height: '50px' }} className="">
      <header className="site-header">
        <Row className="justify-content-center align-self-center align-items-center">
          <Col className={'site-header-left '}>
            <Link to="/" className="logo">
              <img src={Logo} alt="" />
            </Link>
          </Col>
          <Col className={'site-header-right'}></Col>
        </Row>
      </header>
    </Container>
  );
};

export default Header;
