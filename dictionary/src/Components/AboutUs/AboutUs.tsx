import React from 'react';
import './style.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Container } from 'reactstrap';

const AboutUs: React.FunctionComponent = () => {
  return (
    <div>
      <Header />
      <Container>
        <div className="common-page">
          <h1 className="common-page-title">About Us</h1>
          <div className="common-page-body">
            <p>
              FarsiDict is a learning website designed to bring audio and text words for english and farsi speakers. We
              help over 20,000 users each months improve their language skills.
            </p>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default AboutUs;
