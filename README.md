<!-- LTeX: language=fr-FR -->
# Faisons de la musique avec RxJS et l'api WebAudio

Une courte conférence pour présenter une idée un peu bizarre. Et parler des Observables natifs. 

- Les slides déployés sont  [ici](https://benjilegnard.github.io/lets-make-music-with-observables/)
- Les différents examples (fonctionnels dans chrome uniquement) sont également consultables [ici](https://benjilegnard.github.io/lets-make-music-with-observables/examples/)

## Abstract

```markdown
La musique, c’est une émission de son au fil du temps…

Les Observables RxJS nous permettent de manipuler des flux de valeurs au fil du temps.

Et si on faisait de la musique avec des Observables ?

Dans le navigateur web, avec l'api WebAudio et une librairie de théorie musicale
```

## Plan

- Intro
  - C'est quoi un Observable ?
    - pattern Observer / gang of for
    - schéma UML
  - code observer + observable
    - une fonction vs un callback simple.
    - émetteur / récepteur
  - Rx et RxJS 
    - Rx
    - J'ai menti, monte en voiture loser, on va apprendre les Observables natifs.
    - tc39 proposal
    - différences principale
    - concept de base est le même
      - valeurs au fil du temps
  - C'est quoi la musique ?
    - nietche, mozart
- Métronome
  - Commencons par le commencement.
  - BPM: battements par minutes
  - setInterval()
  - créer un Observable, constructor
    - code
  - écouter un évenement sur un bouton
    - getElementById().when("click").subscribe()
  - subscribe() + new Sound
  - WebAudio API
    - apparté, la musique pour un ordinateur
    - webAudio : source / destination
- Rythme / Batterie
  - ok j'ai un Métronome
    - temps / 4/8, ternaire, 5/7
    - boite à rythme
  - switchMap() / filter()
  - grosse caisse sur le premier temps
  - filter() / modulos
  - snare sur le 2e temps
  - lire un son
  - différences d'api
- Basse
  - oscillator
  - sine wave
  - la musique, pour un ordinateur
  - des MATHS
  - le piano
  - notes change
  - theremin
  - apparté, Tonal.js: abstraction
  - apparté Tone.js: au delà de l'api webaudio
- Synthétiseur / Accords
  - ms-20 tease
  - reprendre l'émission initiale, simplifier
  - 
  - nappes
  - accords 
  - théorie musicale
  - démo
- Arpèges aléatoires
  - Un peu de randomisation, gammes, tonal
  - connecter tout ça, il nous manque des pièces
  - Math.random()
- Grand final / Conclusion
  - Deux minutes max de démo
  - Allez plus loin...
    - environnements pour faire du live coding audio
  - RxJS vs Observable natifs.
    - à retenir : la base est là, pas l'api rxjs
    - compatibilité observable natifs / itérateurs asynchrone
    - rxjs 8
  - Merci / qrcode, bizous.


## Sources / Références

### Librairies
- [ReactiveX](https://reactivex.io)
- [RxJS](https://github.com/ReactiveX/rxjs)
- [Tonal](https://github.com/tonaljs/tonal)

### Observables natifs
- [La proposal au TC-39](https://github.com/tc39/proposal-observable?tab=readme-ov-file#ecmascript-observable)
- [La spec W3C](https://wicg.github.io/observable/)
- [Observable Native Demo from JeanMeche](https://stackblitz.com/edit/native-observables)
- [Native & RxJS Observables](https://www.youtube.com/watch?v=WLHyzCY_1Tc)

### Aller plus loin, avec des languages de programmation faits pour faire de la musique :
- [Live Coding with algorithmic patterns](https://tidalcycles.org/)
- [Strudel](https://strudel.cc/)

## Inspiration

Je n'ai aucun mérite, j'ai eu l'idée de faire "ma version" de ce talk après avoir vu ce quickie :

- [Making Techno Reactive with RxJS | Max Bendick | ng-conf 2021](https://www.youtube.com/watch?v=gXXW1rqubk0)

Et en creusant, je me suis rendu compte que ça avait déjà été abordé de manière bien plus sérieuse, allez donc voir ces talks :

- [Ian Hansen - RxJS for Metrics and Music](https://www.youtube.com/watch?v=2btEt0W7UxU)
- [Tero Parviainen "Reactive Music Apps in Angular and RxJS"](https://www.youtube.com/watch?v=EB-CreYq1WY)

## TODOLIST

- [x] finir Plan
- [ ] Slide intro / sound test
- [ ] fix composant marble-diagram
- [ ] refaire diagramme UML avec les termes 
- [ ] slides
  - [ ] 
- [ ] intégration highlight
- [ ] structure en deux colonnes
- [ ] composant code mirror

