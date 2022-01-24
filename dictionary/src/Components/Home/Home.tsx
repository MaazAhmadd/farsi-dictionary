import React from 'react';
import './style.scss';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';
import CategoryCard from '../CategoryCard/CategoryCard';
import DailyWord from '../DailyWord/DailyWord';

const Home: React.FunctionComponent = () => {
  return (
    <div>
      <Header />
      <Search />
      <CategoryCard />
      <DailyWord />
      <Footer />
    </div>
  );
};

export default Home;
