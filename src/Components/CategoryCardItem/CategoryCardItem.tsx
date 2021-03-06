import React, { useEffect, useState } from 'react';
import './style.scss';
import { Container, Table, Row, Col } from 'reactstrap';
import { ICategory } from './Category.types';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { IWord } from '../Search/Word.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import Defaultwordicon from '../../utils/defaultwordicon';
import axios from 'axios';
import getcolorfromword from '../../utils/getcolorfromword';

const CategoryCardItem: React.FunctionComponent = () => {
  // @ts-ignore
  const { categoryName } = useParams();
  let data: any = JSON.parse(sessionStorage.getItem('wordCategories') as string);
  data = data?.find((dt: any) => dt.card_name.toLowerCase() === categoryName.toLowerCase());
  const [words, setWords] = useState<any[]>();

  const getWords = async (wordlist: any) => {
    let wordsincat: any = [];
    for (let i = 0; i < wordlist.length; i++) {
      const el = wordlist[i];
      await axios
        .get(
          `/data/words/${el}.json`
          // , {
          //   headers: {
          //     'Content-Type': 'application/json',
          //     Accept: 'application/json',
          //   },
          // }
        )
        .then((data: any) => {
          wordsincat.push(data.data);
        })
        .catch((e: Error) => {
          console.error(e);
        });
    }

    setWords(wordsincat);
  };
  useEffect(() => {
    getWords(data.words);
  }, []);

  return (
    <>
      <Container>
        <div className="common-page">
          <h1 className="common-page-title">
            Words By {categoryName}
            <Link className="backToHome float-end" to="/">
              Back to Home
            </Link>
          </h1>
          <Row className="mb-5 justify-content-center_item">
            {words &&
              words?.map((w: any, k: any) => {
                let { English, Farsi, Transliteration, Farsi_Audio } = w;
                return (
                  <Col sm={3} xs={6} key={k} className="mb-4">
                    <div
                      onClick={() => {
                        const audio = new Audio(`/farsi_audio/${Farsi_Audio}`);
                        audio.play();
                      }}
                      style={{ backgroundColor: getcolorfromword(English) }}
                      className="word-item_card"
                    >
                      <div className="word-img">
                        <Defaultwordicon />
                      </div>
                      {/* backgroundColor: getcolorfromword(English + 'ex'), */}
                      <div style={{ width: '100%' }}>
                        <div className="card-item-line"></div>
                        <div className="word-english">{English}</div>
                        <div className="word-farsi">{Farsi}</div>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default CategoryCardItem;
