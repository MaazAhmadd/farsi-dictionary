import './style.scss';
import React, { useEffect, useRef, useState } from 'react';
import { FormGroup, Input, Container } from 'reactstrap';
import classNames from 'classnames';
import { IEN2FA, IFA2EN } from './Word.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import WordRender from './WordRender';

const useKeyPress = function (targetKey: 'ArrowDown' | 'ArrowUp' | 'Enter') {
  const [keyPressed, setKeyPressed] = useState(false);

  // @ts-ignore
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  // @ts-ignore
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });

  return keyPressed;
};

const Search: React.FunctionComponent = (): JSX.Element => {
  const boxDiv = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string | null>();
  const [en2faWords, setEn2faWords] = useState<IEN2FA[]>();
  const [en2faOnlyWords, setEn2faOnlyWords] = useState<string[]>();
  const [fa2enWords, setFa2enWords] = useState<IFA2EN[]>();
  const [fa2enOnlyWords, setFa2enOnlyWords] = useState<string[]>();
  const [en2faResultSelected, setEn2faResultSelected] = useState<IEN2FA[]>();
  const [fa2enResultSelected, setFa2enResultSelected] = useState<IFA2EN[]>();
  const [searchResult, setSearchResults] = useState<string[] | undefined>();
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(true);
  const [cursor, setCursor] = useState<number>(0);
  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const enterPress = useKeyPress('Enter');

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event: Event) => {
    //@ts-ignore
    if (boxDiv.current && event.target && !boxDiv.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const changeSearchHandler = () => {
    setCursor(0);
    setIsComponentVisible(true);
    const searchText = searchInput?.current?.value;
    setSearch(searchText);
    let results: string[] | undefined;
    if (searchText) {
      results = en2faOnlyWords
        ?.filter((word: string): boolean => word?.toLowerCase()?.search(searchText.toLowerCase()?.trim()) === 0)
        ?.slice(0, 10);
      if (!results || results?.length === 0) {
        results = fa2enOnlyWords
          ?.filter((word: string): boolean => word?.toLowerCase()?.search(searchText.toLowerCase()?.trim()) === 0)
          ?.slice(0, 10);
      }
    }
    setSearchResults(results);
  };

  const getWords = () => {
    fetch('data/en2fa.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response: Response): Promise<IEN2FA[]> => {
        return response.json();
      })
      .then((data: IEN2FA[]) => {
        setEn2faWords(data);
        setEn2faOnlyWords(
          data
            ?.map((en2faWord): string => en2faWord?.English?.trim())
            ?.filter((word: string, index, self): boolean => word?.length > 0 && self.indexOf(word) === index)
            ?.sort((a: string, b: string): number => a?.localeCompare(b))
        );
      })
      .catch((e: Error) => {
        console.error(e);
      });
    fetch('data/fa2en.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response: Response): Promise<IFA2EN[]> => {
        return response.json();
      })
      .then((data: IFA2EN[]) => {
        setFa2enWords(data);
        setFa2enOnlyWords(
          data
            ?.map((fa2enWord): string => fa2enWord?.Lang?.trim())
            ?.filter((word: string, index, self): boolean => word?.length > 0 && self.indexOf(word) === index)
            ?.sort((a: string, b: string): number => a?.localeCompare(b))
        );
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    if (searchResult?.length && downPress) {
      setCursor((prevState) => (prevState < searchResult?.length - 1 ? prevState + 1 : prevState));
    }
  }, [downPress]);

  useEffect(() => {
    if (searchResult?.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (searchResult?.length && enterPress) {
      buildSelectedResult(searchResult?.[cursor]);
      setIsComponentVisible(false);
    }
  }, [cursor, enterPress]);

  function buildSelectedResult(word: string) {
    if (en2faOnlyWords?.includes(word)) {
      setFa2enResultSelected(undefined);
      setEn2faResultSelected(en2faWords?.filter((en2faWord): boolean => en2faWord?.English?.trim() === word));
    } else if (fa2enOnlyWords?.includes(word)) {
      setEn2faResultSelected(undefined);
      setFa2enResultSelected(fa2enWords?.filter((fa2enWord): boolean => fa2enWord?.Lang?.trim() === word));
    }
  }
  return (
    <>
      <div className="hero">
        <Container className="">
          <div className="search-form" ref={boxDiv}>
            <FormGroup className="custom-search-box">
              <Input
                type="text"
                bsSize="lg"
                placeholder="Type English or Farsi Word"
                onChange={changeSearchHandler}
                innerRef={searchInput}
                onFocus={() => setIsComponentVisible(true)}
              />
              <FontAwesomeIcon icon={faSearch as any} />
              {search && search?.length > 0 && isComponentVisible && (
                <ul className="search-result">
                  {searchResult && searchResult?.length > 0 ? (
                    searchResult?.map((word: string, key: number) => {
                      return (
                        <li
                          key={key}
                          onClick={() => {
                            buildSelectedResult(word);
                            setIsComponentVisible(false);
                          }}
                          className={classNames({
                            hover: key === cursor,
                          })}
                          onMouseEnter={() => {
                            setCursor(key);
                          }}
                        >
                          {word}
                        </li>
                      );
                    })
                  ) : (
                    <li className="no_match_found">No match found</li>
                  )}
                </ul>
              )}
            </FormGroup>
          </div>
        </Container>
      </div>

      <Container className="">
        <div className="result-con">
          {en2faResultSelected || fa2enResultSelected ? (
            <>
              {en2faResultSelected && <WordRender words={en2faResultSelected} lang="en" />}
              {fa2enResultSelected && <WordRender words={fa2enResultSelected} lang="fa" />}
            </>
          ) : (
            <div className="selected-no-result">
              <FontAwesomeIcon icon={faSearch as any} />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Search;
