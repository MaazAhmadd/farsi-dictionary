import React, { useEffect, useState } from 'react';
import './style.scss';
import { Container, Row, Col } from 'reactstrap';
import { ICategory } from './DailyWord.types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';

const DailyWord: React.FunctionComponent = () => {
  const [word, setWord] = useState<ICategory>();
  const getCategories = () => {
    const dataUrl = '/data/dailyWord.json';
    fetch(dataUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response: Response): Promise<ICategory> => {
        return response.json();
      })
      .then((data: ICategory) => {
        setWord(data);
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Container style={!word ? { minHeight: 250 } : {}}>
      <div className="dailyword">
        <h1>Word Of The Day</h1>
        <div style={{ display: 'flex', color: '#1b85e5' }}>
          <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: '600' }}>{word?.English}</span>
          {word?.Farsi_Audio && (
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
        </div>
        <div>{word?.Farsi}</div>
      </div>
    </Container>
  );
};

export default DailyWord;
