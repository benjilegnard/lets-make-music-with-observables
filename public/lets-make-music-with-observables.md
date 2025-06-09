<!-- LTeX: language=fr-FR -->
# Faisons de la musique réactive avec ~~RxJS~~, des Observables et l’API WebAudio 🎧 🎼 🔊 🎛️



## 🔊 Introduction
<img src="/images/benjamin-legrand.png" class="portrait" />

- Benjamin Legrand<!-- .element class="fragment"-->
- 🧑‍💻Tech lead @ onepoint<!-- .element class="fragment"-->
- 🌐 @benjilegnard<!-- .element class="fragment"-->
- ⌨️ Split keyboards<!-- .element class="fragment"--> 
- 🎸 Musicien<!-- .element class="fragment"-->

Notes:
- Présentation Speaker.
- hobbies: musicien, intéréssant pour ce talk.
- Aujourd'hui je vais vous parler de comment faire de la musique avec des Observables, mais avant...


### 📅 Historique de ce talk
<img src="/images/making-techno-reactive-with-rxjs-max-bendick-ng-conf-2021.png" />

[Making Techno Reactive with RxJS | Max Bendick | ng-conf 2021](https://www.youtube.com/watch?v=gXXW1rqubk0)

Notes:
- Avant, un peu d'historique et SHOUTOUT, l'idée de base n'est pas de moi, Je l'ai piquée à Max Bendick.
- Talk à la ng-conf de 5 minutes en 2021, quand je me suis mis à être speaker, j'ai repensé à ce talk, et à comment j'aimerais beaucoup en faire "ma" version.
- Quand j'ai commencé à travailler sur ce talk, c'était pour enseigner RxJS de manière un peu ludique à mes collègues.
- Sauf que: il s'est passé des choses depuis...
- Je vais vous parler des Observables (ice-breaker: qui dans la salle sait ce que c'est ou en a déjà utilisé ?)


### 🤔 C'est quoi un Observable ?
- Pattern de gestion réactive d'un changement de valeur<!-- .element class="fragment"-->
- "Push", 📢 Producteur -> 👂Consommateur<!-- .element class="fragment"-->
- "Value change as Events" / temps réèl<!-- .element class="fragment"-->

Notes:
- Ce n'est pas nouveau,
- et, c'est basé sur le: Pattern Observer. ( d'où le nom )


### Pattern Observer
<img src="/images/gang-of-four-design-patterns.jpg" alt="Couverture du livre 'Gang of Four: Design Patterns'" style="max-height: 60vh"/>

Notes:
- Fait partie des 23 designs patterns du gang of four.
- Des gens qui l'ont lu ce bouquin dans la salle ?
- La base de la POO, mais c'est comme clean code: à connaître, mais n'en faite pas une bible.


### Un petit schéma UML
<img src="/images/observer-uml-diagram.png" alt="Diagramme UML, représentation Objet du pattern" style="" />

Notes:
- ça c'était la version Java/Objet
- dans le monde javascript, on a une librairie qui s'est vite imposée.
- les termes sont un peu différents


### ReactiveX et RxJS 
<img src="/images/rx-logo.png" alt="" style="max-height: 10vh" />

[https://rxjs.dev/](https://rxjs.dev/)
- Observer<!-- .element class="fragment"-->
- Iterator<!-- .element class="fragment"-->
- Functional Programming<!-- .element class="fragment"-->

Notes:
- basé sur un deuxième pattern du gang of four, l'Itérateur
- Rajotue de notions de Programmation fonctionnelle, notemment par le fait que vous manipuler/combiner avec des fonctions "pures"
- Il y'a d'autres librairies (zen-observable, fate-observable, core-js) mais RxJS est king, because angular


### En JavaScript/TypeScript
| Observer | Observable | Subscription |
|-|-|-|
| next() | constructor()<!-- .element class="fragment"--> | unsubscribe() |
| error() | of() | closed |
| complete() | from() | |


Notes:
- de l'api de base, vous avez trois objets principaux à connaître
- Observable, qui encapsule une donnée au fil du temps
- Subscriber: va avoir lalogique de : qu'est ce que je fais quand une donnée


### Une fonction vs un callback simple.



### Avantages
- pas d'impératif
- on s'abonne à des données
- on peut "composer" / fusionner des observables
- paresseux: pas d'éxécution tant que pas d'abonnement
Notes:
- ça reste banger pour manipuler des fonctions au fil du temps


### Et là, c'est le drame :
<img 
    src="/images/ben-lesh-twitter-observables.png"
    alt="Ben Lesh, on twitter/x, the 14 avr Ben Lesh: Y’all there are observables in your browser right now. if you are in a chromium based browser, that is up-to-date, open your console and type the word  “Observable”"
/>

- Avril 2025 / Chrome 135

Notes:
- Observable natif disponibles dans la console.
- avant ça ils étaient derrière un flag expérimental à activer


### J'ai menti, monte en voiture loser, on va apprendre les Observables natifs.
<img src="/images/get-in-loser-observables.jpg"/>
Notes:
- du coup je vais pas trop vous parler d'RxJS.
- mais plutôt des Observables natifs


### TC39 proposal

<https://github.com/tc39/proposal-observable>

Notes:
- Stages à expliquer si on à le temps


### Différences principales
Notes:
- le concept de base est le même
- maintenant qu'on a vu ce qu'était un Observable.
- Posons nous la question, c'est quoi la musique.



## 🕰️ Métronome
Notes:
- Commencons par le commencement.
- Le rythme.


### BPM: battements par minutes
- Pas suffisant.
- Signature temporelle
// TODO code conversion

### setInterval()



### créer un Observable, constructor
    - code


### écouter un évenement sur un bouton
    - getElementById().when("click").subscribe()


### subscribe() + new Sound


### WebAudio API
    - apparté, la musique pour un ordinateur
    - webAudio : source / destination



## 🥁 Rythme / Batterie


### ok j'ai un Métronome
    - temps / 4/8, ternaire, 5/7
    - boite à rythme


### switchMap() / filter()


### grosse caisse sur le premier temps


### filter() / modulos


### snare sur le 2e temps


### lire un son


### différences d'api



## 🎸 Basse


### oscillator


### sine wave


### la musique, pour un ordinateur


### des MATHS


### le piano


### notes change


### theremin


### apparté, Tonal.js: abstraction


### apparté Tone.js: au delà de l'api webaudio



## 🎹 Synthétiseur / Accords


### ms-20 tease


### reprendre l'émission initiale, simplifier


### Enveloppe generator


### nappes


### accords 


### théorie musicale


### démo



## Arpèges aléatoires


### Un peu de randomisation, gammes, tonal


### connecter tout ça, il nous manque des pièces


### Math.random()



## Grand final


### Deux minutes max de démo



## Conclusion


### Ce qu'on a vu des Observables natifs
- utilisable sur les objets du DOM natifs (EventTarget)
- juste les briques de base pour l'instant
- API Builder-oriented
- ⚠️ API asynchrone : certains opérateurs retournent des promesses.


### Y U NO pipe() ?
<img src="/images/magritte-pipe.jpg" />

Notes:
- pas une API fonctionnelle, plus orienté objet.


### RxJS vs Observable natifs.
- à retenir : la base est là, pas l'api rxjs complète
- compatibilité avec les itérateurs asynchrone
- rxjs à terme deviendrait une lib utilitaire


### Mauvaise nouvelle.
- C'est toujours en stage 1. <https://www.proposals.es/stages/stage1>
- Chrome uniquement

- Tests : https://wpt.fyi/results/dom/observable?label=experimental&label=master&aligned 


### Si vous voulez faire de la musique avec du code.
- [Tidal Cycles](https://tidalcycles.org/)
- [Strudel](https://strudel.cc/)

Notes:
- ce que j'ai commencé à développer autour de ça, ça ressemble énormément à un DSL, un domain-specific-language pour faire de la musique.
- et ça existe déjà, notemment pour faire du live-coding.


### Merci

<div class="qr-codes">
  <div class="slides-link">
    <h4>⬇️ Slides ⬇️</h4>
    <a href="https://benjilegnard.github.io/lets-make-music-with-observables/">
      <img src="images/qrcode-slides.png" alt="QRCode du lien vers les slides">
    </a>
  </div>
  <img src="images/logo-sunny-tech.svg" style="width: 200px;height: 200px;" alt="Logo de la conférence Sunny Tech"/>
  <div class="openfeedback-link">
    <h4>⬇️ Feedback ⬇️</h4>
    <a href="https://openfeedback.io/sunnytech2025/2025-06-27/cm7hgps96001ks23nm7cgh1i0">
      <img src="images/qrcode-sunnytech-openfeedback.png" alt="QRCode du lien vers openfeedback">
    </a>
  </div>
</div>
