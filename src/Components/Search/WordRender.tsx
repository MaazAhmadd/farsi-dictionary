import React, { useEffect, useState } from 'react';
import { IEN2FA, IFA2EN } from './Word.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';

interface IWordRender {
  words: (IEN2FA | IFA2EN)[];
  lang: 'en' | 'fa';
}

const WordRender: React.FunctionComponent<IWordRender> = ({ words, lang }: IWordRender): JSX.Element => {
  const [groupByPOSMeaning, setGroupByPOSMeaning] = useState<any>();
  const [wordTitle, setWordTitle] = useState<string>();
  const [wordAudio, setWordAudio] = useState<string>();
  useEffect(() => {
    if (lang === 'en') {
      setWordTitle((words as IEN2FA[])?.[0]?.English);
      setWordAudio((words as IEN2FA[])?.[0]?.EnglishAudio);
    } else if (lang === 'fa') {
      setWordTitle((words as IFA2EN[])?.[0]?.Lang);
      setWordAudio((words as IFA2EN[])?.[0]?.LangAudio);
    }
    setGroupByPOSMeaning(
      words.reduce(function (r, a) {
        r[a.POS] = r[a.POS] || [];
        if (lang === 'en') {
          r[a.POS][(a as IEN2FA)?.EnglishMeaning] = r[a.POS][(a as IEN2FA)?.EnglishMeaning] || [];
          r[a.POS][(a as IEN2FA)?.EnglishMeaning].push(a);
        } else if (lang === 'fa') {
          r[a.POS][(a as IFA2EN)?.LangMeaning] = r[a.POS][(a as IFA2EN)?.LangMeaning] || [];
          r[a.POS][(a as IFA2EN)?.LangMeaning].push(a);
        }
        return r;
      }, Object.create(null))
    );
  }, [words, lang]);
  let wordNumber = 0;
  return (
    <div className="selected-result">
      <div className="word-title">
        {wordTitle}
        {wordAudio && (
          <span className="audio-icon">
            <FontAwesomeIcon
              icon={faVolumeUp}
              onClick={() => {
                const audio = new Audio(`english_audio/${wordAudio}`);
                audio.play().then(() => {});
              }}
            />
          </span>
        )}
      </div>
      {groupByPOSMeaning &&
        Object.keys(groupByPOSMeaning)?.map(
          (pos: string, key: number): JSX.Element => (
            <div key={key} className="meaning-box">
              <div className="meaning-label">{pos}</div>
              {groupByPOSMeaning[pos] &&
                Object.keys(groupByPOSMeaning[pos])?.map(
                  (pos_meaning: string, key3: number): JSX.Element => (
                    <div key={key3} className="pos-con">
                      <div className="pos-meaning">
                        {++wordNumber}. ({pos_meaning})
                      </div>
                      <ol type="a">
                        {groupByPOSMeaning?.[pos]?.[pos_meaning]?.map((word: IEN2FA | IFA2EN, key2: number) => {
                          let meaning = '';
                          let pronunciation = '';
                          let audioFile = '';
                          let sentence = '';
                          let sentenceTranslate = '';
                          if (lang === 'en') {
                            meaning = word.Lang;
                            audioFile = word.LangAudio;
                            pronunciation = (word as IEN2FA).EnglishPronunciation;
                            sentence = (word as IEN2FA).EnglishSentence;
                            sentenceTranslate = (word as IEN2FA).EnglishSentenceTranslate;
                          } else if (lang === 'fa') {
                            meaning = word.English;
                            audioFile = word.EnglishAudio;
                            pronunciation = (word as IFA2EN).LangPronunciation;
                            sentence = (word as IFA2EN).LangSentence;
                            sentenceTranslate = (word as IFA2EN).LangSentenceTranslate;
                          }
                          return (
                            <li key={key2}>
                              <div className="meaning-title">
                                {meaning} ({pronunciation})
                                {audioFile && (
                                  <span className="audio-icon">
                                    <FontAwesomeIcon
                                      icon={faVolumeUp}
                                      onClick={() => {
                                        const audio = new Audio(`farsi_audio/${audioFile}`);
                                        audio.play().then(() => {});
                                      }}
                                    />
                                  </span>
                                )}
                              </div>
                              <div className="meaning-pronunciation">
                                <span className="sentence">{sentence}</span> -{' '}
                                <span className="sentenceTranslate">{sentenceTranslate}</span>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  )
                )}
            </div>
          )
        )}
    </div>
  );
};

export default WordRender;
