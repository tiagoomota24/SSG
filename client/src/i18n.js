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
      account: 'Account',
      adminPanel: 'Admin Panel',
      introId:'Phishing (a play on “fishing” as in “fishing for information,” since the information is the “bait” that lures the victim) involves using various methods to trick users into revealing personal and confidential data, such as credit card numbers, bank account information, social security numbers, passwords, and more.',
      howItWorksId:'The “phishers” use various methods to obtain information, including spam, pop-up or email messages, posing as legitimate companies or organizations with which the potential victim does business – for example, their Internet service provider, bank, online payment services, or even a government agency. These messages often claim that the user needs to “update” or “validate” their account information, even threatening negative consequences (such as account closure) if there is no response. These threatening and manipulative techniques are known as Social Engineering, which also includes more seductive forms of persuasion, such as “offering” items, trips, or money over the Internet.',
      howToIdentifyId:'There are several ways to identify phishing attempts. Some signs include spelling and grammar errors, strange email addresses or URLs, requests for personal or financial information, and excessive threats or urgency.',
      howItWorks:'How does Phishing work ?',
      howToIdentify:'How to identify Phishing?'
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
      account: 'Conta',
      adminPanel: 'Painel de Admin',
      introId:'O phishing (trocadilho com “fishing” ou “ir à pesca” em inglês, dado que a informação é como que um “anzol” que se espera que alguém “morda”) consiste em utilizar métodos vários que levem o utilizador a revelar dados pessoais e confidenciais, como os seus números de cartão de crédito, informação de contas bancárias, números de segurança social, passwords, entre outros.',
      howItWorksId:'Os “phishers” recorrem a várias formas de obtenção de informação, nomeadamente, spam, mensagens de pop-up ou de e-mail, fazendo-se passar por empresas ou organizações legítimas com as quais a potencial vítima tem negócios – por exemplo, o seu fornecedor de serviços de Internet, banco, serviços de pagamentos online ou até um organismo governamental. Estas mensagens costumam alegar que o utilizador precisa de “atualizar” ou “validar” a informação da sua conta, chegando a ameaçar com consequências negativas (o fecho da conta, por exemplo) caso não haja resposta. A estas técnicas de ameaça e manipulação dá-se o nome de Engenharia Social, nas quais também se inserem as formas mais sedutoras de persuasão, como a “oferta” de artigos, viagens ou dinheiro através da Internet.',
      howToIdentifyId:'Existem várias maneiras de identificar tentativas de phishing. Alguns sinais incluem erros de ortografia e gramática, endereços de e-mail ou URLs estranhos, solicitações de informações pessoais ou financeiras e ameaças ou urgência excessiva.',
      howItWorks:'Como funciona o Phishing ?',
      howToIdentify:'Como identificar o Phishing?'
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
