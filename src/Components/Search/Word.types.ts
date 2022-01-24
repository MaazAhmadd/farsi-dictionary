interface IWord {
  English: string;
  Farsi: string;
  Transliteration: string;
  Farsi_Audio: string;
  English_Audio: string;
}

interface IEN2FA {
  POS: string;
  English: string;
  Lang: string;
  EnglishMeaning: string;
  EnglishPronunciation: string;
  EnglishSentence: string;
  EnglishSentenceTranslate: string;
  EnglishAudio: string;
  LangAudio: string;
}

interface IFA2EN {
  POS: string;
  Lang: string;
  English: string;
  LangMeaning: string;
  LangPronunciation: string;
  LangSentence: string;
  LangSentenceTranslate: string;
  LangAudio: string;
  EnglishAudio: string;
}

export type { IWord, IEN2FA, IFA2EN };
