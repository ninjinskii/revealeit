export default {
  app_name: "Revealeit",
  rules__title: "Règles",
  rules__body:
    `Revealeit est un jeu de plateau de traque des pièces de votre adversaire.`,
  rules__list: {
    rules__use_pieces:
      "Déplacez vos pièces pour révéler les pièces adverses",
    rules__how_to_win: "Éliminez toutes les pièces adverses pour gagner",
    rules__move_pieces: "Déplacez chacune de vos pièces à chaque tour",
    rules__kill_on_turn_end: "Vous pouvez éliminer une pièce après avoir effectué tous vos déplacements",
  },
  rules_pieces__list: {
    explorer: {
      id: "explorer",
      name: "Explorateur",
      description: "Révèle les cases sur sa ligne/colonne sur toute la longueur du plateau."
    },
    assassin: {
      id: "shooter",
      name: "Assassin",
      description: "Révèle les cases adjacentes à lui même. Peut éliminer une pièce adverse révélée sur sa ligne/colonne à une distance de 2 cases."
    },
  },
  piece__details: "Vous disposez des pièces suivantes:",
  piece__action_kill: "Tuer",
  enter_name: "Votre pseudo",
  enter_name__error: "Votre pseudo doit contenir uniquement 16 chiffres/lettres.",
  go: "Jouer",
  close: "Fermer",
  info__waiting_for_server: "Connexion au serveur...",
  info__waiting_for_player: "En attente d'autres joueurs",
  info__waiting_for_turn: "Au tour de {playerName}",
  info__your_turn: "A vous de jouer",
  info__you_win: "Vous avez gagné ! Actualisez la page pour rejouer.",
  info__you_loose: "Vous avez perdu. Actualisez la page pour rejouer.",
};
