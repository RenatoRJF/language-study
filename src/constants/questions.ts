import shuffle from "lodash/shuffle";

export const allQuestions = [
  {
    question: "Há onze janelas na minha casa",
    correctAnswer: "Er zijn elf ramen in mijn huis.",
  },
  {
    question: "Há doze pessoas no prédio",
    correctAnswer: "Er zijn twaalf mensen in het gebouw.",
  },
  {
    question: "Há treze escolas na minha cidade",
    correctAnswer: "Er zijn dertien scholen in mijn stad.",
  },
  {
    question: "Há quatorze paradas de ônibus na estação de ônibus",
    correctAnswer: "Er zijn veertien bushaltes op het busstation.",
  },
  {
    question: "Há quinze aminais no zoológico",
    correctAnswer: "Er zijn vijftien dieren in de dierentuin.",
  },
  {
    question: "Há dezesseis cães na rua",
    correctAnswer: "Er zijn zestien honden op straat.",
  },
  {
    question: "Há dezoito carros no parque",
    correctAnswer: "Er zijn achttien auto's in het park.",
  },
  {
    question: "Há dezenove pássaros na árvore",
    correctAnswer: "Er zijn negentien vogels in de boom.",
  },
  {
    question: "Há vinte grandes TVs no shopping center",
    correctAnswer: "Er zijn twintig grote tv's in het winkelcentrum.",
  },
  {
    question: "Minha casa é grande",
    correctAnswer: "Mijn huis is groot.",
  },
  {
    question: "Minha casa é pequena",
    correctAnswer: "Mijn huis is klein.",
  },
  {
    question: "Minha casa é nova",
    correctAnswer: "Mijn huis is nieuw.",
  },
  {
    question: "Minha casa é velha",
    correctAnswer: "Mijn huis is oud.",
  },
  {
    question: "Minha casa é fria",
    correctAnswer: "Mijn huis is koud.",
  },
  {
    question: "Minha casa é quente",
    correctAnswer: "Mijn huis is warm.",
  },
  {
    question: "Minha casa é marrom",
    correctAnswer: "Mijn huis is bruin.",
  },
  {
    question: "Minha casa é confortável",
    correctAnswer: "Mijn huis is comfortabel.",
  },
  {
    question: "Minha casa é suja",
    correctAnswer: "Mijn huis is vies.",
  },
  {
    question: "Minha casa é limpa",
    correctAnswer: "Mijn huis is schoon.",
  },
  {
    question: "Minha casa é baixa",
    correctAnswer: "Mijn huis is laag.",
  },
  {
    question: "Minha casa é alta",
    correctAnswer: "Mijn huis is hoog.",
  },
  {
    question: "Minha casa fica no andar de cima",
    correctAnswer: "Mijn huis is op de bovenverdieping.",
  },
  {
    question: "Minha casa fica no andar de baixo",
    correctAnswer: "Mijn huis is op de benedenverdieping.",
  },
  {
    question: "Minha casa tem quatro janelas",
    correctAnswer: "Mijn huis heeft vier ramen.",
  },
  {
    question: "Minha casa tem uma pequena escada",
    correctAnswer: "Mijn huis heeft een kleine trap.",
  },
  {
    question: "Minha casa tem duas portas",
    correctAnswer: "Mijn huis heeft twee deuren.",
  },
  {
    question: "Minha casa tem um telhado",
    correctAnswer: "Mijn huis heeft een dak.",
  },
  {
    question: "Minha casa tem muitas paredes",
    correctAnswer: "Mijn huis heeft veel muren.",
  },
  {
    question: "Minha casa tem dez quartos",
    correctAnswer: "Mijn huis heeft tien kamers.",
  },
  {
    question: "Minha casa tem um quarto",
    correctAnswer: "Mijn huis heeft een slaapkamer.",
  },
  {
    question: "Minha casa tem uma sala de estar",
    correctAnswer: "Mijn huis heeft een woonkamer.",
  },
  {
    question: "Minha casa tem um jardim",
    correctAnswer: "Mijn huis heeft een tuin.",
  },
  {
    question: "Minha casa tem uma varanda",
    correctAnswer: "Mijn huis heeft een balkon.",
  },
  {
    question: "Minha casa tem uma garagem",
    correctAnswer: "Mijn huis heeft een garage.",
  },
  {
    question: "Minha casa tem uma cerca",
    correctAnswer: "Mijn huis heeft een hek.",
  },
  {
    question: "Minha casa tem um quintal",
    correctAnswer: "Mijn huis heeft een achtertuin.",
  },
  {
    question: "Minha casa tem um jardim da frente",
    correctAnswer: "Mijn huis heeft een voortuin.",
  },
  {
    question: "Minha casa tem uma piscina",
    correctAnswer: "Mijn huis heeft een zwembad.",
  },
  {
    question: "Minha casa tem uma cozinha",
    correctAnswer: "Mijn huis heeft een keuken.",
  },
  {
    question: "Minha casa tem um corredor",
    correctAnswer: "Mijn huis heeft een gang.",
  },
  {
    question: "Minha casa tem um sótão",
    correctAnswer: "Mijn huis heeft een zolder.",
  },
  {
    question: "Minha casa tem um banheiro",
    correctAnswer: "Mijn huis heeft een badkamer.",
  },
  {
    question: "Minha casa tem uma porta marrom",
    correctAnswer: "Mijn huis heeft een bruine deur.",
  },
  {
    question: "Minha casa é um apartamento",
    correctAnswer: "Mijn huis is een appartement.",
  },
  {
    question: "Minha casa tem um elevador",
    correctAnswer: "Mijn huis heeft een lift.",
  },
  {
    question: "Minha casa é um prédio",
    correctAnswer: "Mijn huis is een gebouw.",
  },
  {
    question: "Minha casa tem um corredor longo",
    correctAnswer: "Mijn huis heeft een lange gang.",
  },
  {
    question: "Minha casa tem uma parede curta",
    correctAnswer: "Mijn huis heeft een korte muur.",
  },
  {
    question: "A casa não é minha",
    correctAnswer: "Het huis is niet van mij.",
  },
  {
    question: "A casa foi construída",
    correctAnswer: "Het huis is gebouwd.",
  },
  {
    question: "Meu irmão mora na minha casa",
    correctAnswer: "Mijn broer woont in mijn huis.",
  },
  {
    question: "Eu estou na sua casa",
    correctAnswer: "Ik ben in jouw huis.",
  },
  {
    question: "Eu moro perto da praia",
    correctAnswer: "Ik woon dicht bij het strand.",
  },
  {
    question: "Eu moro em um apartamento com minha namorada",
    correctAnswer: "Ik woon in een appartement met mijn vriendin.",
  },
  {
    question: "Minhas amigas moram em uma casa grande",
    correctAnswer: "Mijn vriendinnen wonen in een groot huis.",
  },
  {
    question: "Meu vizinho tem uma bela casa",
    correctAnswer: "Mijn buurman heeft een mooi huis.",
  },
];

export const QUESTIONS = shuffle(allQuestions);
