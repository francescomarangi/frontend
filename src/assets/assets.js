import aspirapolvere from './aspirapolvere.jpg';
import coltelli from './coltelli.jpg';
import cuffie from './cuffie.jpg';
import giubbotto from './giubbotto.jpg';
import libri from './libri.jpg';
import logo from './Logo.png';
import lente from './lente.png';
import carrello from './carrello.png';

import casa from './casa.jpg';
import tecnologia from './tecnologia.png';

const assets = {
  aspirapolvere,
  coltelli,
    cuffie,
    giubbotto,
    libri,
    logo,
    lente,
    carrello
};

const lista_categorie = [
  {categoria: "Casa",
    immagine_cat : casa,
    descrizione: "Scopri la nostra selezione di prodotti per rendere la tua casa più smart, accogliente e funzionale. Dagli elettrodomestici all'arredamento."
  },
  {categoria: "Elettronica",
    immagine_cat: tecnologia,
    descrizione: "Le ultime novità dal mondo tech. Trova smartphone, computer e gadget innovativi per rivoluzionare il tuo lavoro."
  }
];

export {assets, lista_categorie};