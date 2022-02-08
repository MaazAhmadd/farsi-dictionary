import React from 'react';
import './style.scss';

import Search from '../Search/Search';
import CategoryCard from '../CategoryCard/CategoryCard';
import PhraseCard from '../PhraseCard/PhraseCard';
import DailyWord from '../DailyWord/DailyWord';

const Home: React.FunctionComponent = () => {
  return (
    <div>
      <Search />
      <CategoryCard />
      {/* <hr /> */}
      <PhraseCard />
      {/* <hr /> */}
      <DailyWord />
    </div>
  );
};

export default Home;
