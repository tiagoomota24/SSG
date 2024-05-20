import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      home: 'Home',
      games: 'Games',
      leaderboard: 'Leaderboard',
      digital_security: 'Digital Security',
      phishing: 'Phishing',
      malware: 'Malware',
      ransomware: 'Ransomware',
      login: 'Login',
      account_details: 'Account Details',
      history: 'History',
      logout: ' Logout',
      account: 'Account'
    }
  },
  pt: {
    translation: {
      home: 'Home',
      games: 'Jogos',
      leaderboard: 'Tabela De Classificação',
      digital_security: 'Segurança Digital',
      phishing: 'Phishing',
      malware: 'Malware',
      ransomware: 'Ransomware',
      login: 'Login',
      account_details: 'Detalhe da Conta',
      history: 'Histórico',
      logout: ' Terminar sessão',
      account: 'Conta'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
