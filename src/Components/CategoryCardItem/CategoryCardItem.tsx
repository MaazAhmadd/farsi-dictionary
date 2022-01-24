import React, { useEffect, useState } from 'react';
import './style.scss';
import { Container, Table } from 'reactstrap';
import { ICategory } from './Category.types';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { IWord } from '../Search/Word.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';

const CategoryCardItem: React.FunctionComponent = () => {
  // @ts-ignore
  const { categoryName } = useParams();

  const [category, setCategory] = useState<ICategory>();
  const [words, setWords] = useState<IWord[]>();
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
        setCategory(data?.find((dt) => dt.card_name === categoryName));
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };
  const getWords = () => {
    const dataUrl = '/data/words.json';
    fetch(dataUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response: Response): Promise<IWord[]> => {
        return response.json();
      })
      .then((data: IWord[]) => {
        setWords(data);
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };
  useEffect(() => {
    getWords();
  }, []);
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Header />
      <Container>
        <div className="common-page">
          <h1 className="common-page-title">
            Words By {category?.card_name}
            <Link className="backToHome float-end" to="/">
              Back to Home
            </Link>
          </h1>
          <div className="common-page-body">
            <Table className="">
              <thead>
                <tr>
                  <th>English</th>
                  <th>Farsi</th>
                  <th>Audio</th>
                </tr>
              </thead>
              <tbody>
                {words &&
                  words
                    ?.filter((word) => category?.words?.includes(word?.English))
                    ?.map((word, key) => {
                      return (
                        <tr key={key}>
                          <td>{word?.English}</td>
                          <td>{word?.Farsi}</td>
                          <td>
                            {word.Farsi_Audio && (
                              <span className="audio-icon-2">
                                <FontAwesomeIcon
                                  icon={faVolumeUp}
                                  onClick={() => {
                                    const audio = new Audio(`/farsi_audio/${word.Farsi_Audio}`);
                                    audio.play().then(() => {});
                                  }}
                                />
                              </span>
                            )}
                            <span> {word.Transliteration}</span>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default CategoryCardItem;
