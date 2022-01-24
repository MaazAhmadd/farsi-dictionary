import React, { useEffect, useState } from 'react';
import './style.scss';
import { Container, Row, Col } from 'reactstrap';
import { ICategory } from './Category.types';
import { Link } from 'react-router-dom';

const CategoryCard: React.FunctionComponent = () => {
  const [categories, setCategories] = useState<ICategory[]>();
  const getCategories = () => {
    const dataUrl = '/data/card.json';
    fetch(dataUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response: Response): Promise<ICategory[]> => {
        return response.json();
      })
      .then((data: ICategory[]) => {
        setCategories(data);
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Container style={!categories ? { minHeight: 250 } : {}}>
      <h4 className="mt-5 mb-4 pb-2 text-center">Learn words by topics</h4>
      <Row className="mb-5 justify-content-center">
        {categories &&
          categories?.map((category, key) => {
            return (
              <Col sm={3} xs={6} key={key} className="mb-4">
                <Link className="catCard" to={'/category/' + category?.card_name}>
                  <div className="card-image-wrapper" style={{ backgroundColor: category?.color }}>
                    <img src={'/category-image/' + category?.image} alt={category?.card_name} className="" />
                  </div>
                  <span>{category?.card_name}</span>
                </Link>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default CategoryCard;
