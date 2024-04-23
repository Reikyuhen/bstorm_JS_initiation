# bstorm JavaScript : Premier projet, initiation
Lors de ce projet nous avons pu mettre à l'épreuve notre compréhension de JavaScript, HTML et CSS dans une forme ludique d'un site/jeux. Nous avions 6 jours pour effectuer ce dernier.

## La mise à l'épreuve
Notre formateur nous a ainsi mis en avant le projet sous le format d'une vidéo présentation où nous devions reproduire avec quasi exactitude le format, l'animation et les jeux reproduit sur sa maquette. Nous avions quartier libre sur certain aspect visuel, s'arretant là.

## Le grand saut

### HTML/CSS

- Après avoir visualisé j'ai commencé par structuré la partie HTML étant le corps de ce projet.
- J'ai décidé ensuite d'effectuer le CSS en me familiarisant avec les flexbox.
  
### JavaScript

- J'ai tout mis sur un seul fichier JavaScript, après une formation plus longue j'ai appris que ce n'est pas très esthétique ni recommandé.
- La consigne dans ce projet était de ne pas utiliser HTML, plus précisément de créer tout l'HTML via JavaScript en utilisant la methode "document.createElement" et donc ainsi manipuler le DOM.
- J'ai créer d'abord le "hub" de mon site en mettant en place toute l'architecture global via la fonction game_display(), cette dernière met en place toutes les focntions tel que ajouter des joueurs, en retirer, mettre en place les boutons de jeux, etc.
- Lorsque toute l'architecture du site est mis en place la fonction game_display() lance automatiquement par défaut le premier jeux qui est un jeux de selection de personne, election_game_intro()
- J'ai décidé de déstructurer les 3 jeux en trois mode différent.
- Chaque mode "intro" lancé modifie les règles etablit dans l'architecture de base du site
- J'ai également mis une vérification de noms pour éviter comme sur la description du projet d'avoir des noms similaires.
- Plusieurs fonctions sont activés ou "désactivés" selon les différents mode de jeux.
- Lors d'un jeux en cours j'ai fait en sorte d'éviter qu'on puisse modifier ou toucher quoique ce soit pendant le déroulement du jeux.

## Les modes

### Election Game
- Ce mode de jeux d'à partir de minimum 2 joueurs lance une roulette qui change les classes des personnes afin que le css les mettent en avant.
- Lorsque nous lançons la roulette, elle défile selon le nombre de joueur aléatoirement afin d'en désigner un vainqueur.
- Le vainqueur se verra clignoter pour dire que c'est lui qui est élu.

### Classement Game
- On est sur une version amélioré du jeux de l'élection qui met un classement parmis les personnes sélectionnées. Grisant au fur et à mesure les concurent pour en garder que les 3 premiers.
- Ici nous avons ajouter encore des classes CSS modifiable qui permettent de visualiser les différentes parties.
- Le bouton reset permet de remettre la partie à zéro en remettant toute les classes css des personnages à leurs origines.
### Questions Game
- À Faire 

## Conclusion

Lors de ce court mais intense projet cela m'a permis de visualiser dans un plus large ensemble ce que compose les différentes fonction d'un site. L'utilisations de différentes fonctions intégré (ainsi que leurs découvertes) m'ont permis d'avancer grandement dans la compréhension de JavaScript en son ensemble.