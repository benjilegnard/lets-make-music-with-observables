<!-- LTeX: language=fr-FR -->
# Faisons de la musique avec RxJS et l'api WebAudio

Une courte conférence pour présenter une idée un peu bizarre. Et parler des Observables natifs. 

- Les slides déployés sont  [ici](https://benjilegnard.github.io/lets-make-music-with-observables/)
- Les différents examples (fonctionnels dans chrome uniquement sont):
  - là
  - ici
  - là
  - ou encore là

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
  - Rx et RxJS 
  - J'ai menti, monte en voiture loser, on va apprendre les Observables natifs.
  - C'est quoi la musique ? ( des maths)
  - Pour un ordinateur.
- Métronome
  - Commencons par le commencement.
  - BPM
  - setInterval()
  - créer un Observable, constructor
  - subscribe() + new Sound
  - WebAudio API
- Rythme / Batterie
  - switchMap() / filter()
  - filter() / modulos
  - webAudio : source / destination
- Basse
  - oscillator
  - sine wave
  - notes change
  - apparté, Tonal.js
- Synthétiseur
  - nappes
  - accords 
  - théorie musicale
- Arpèges aléatoires
    Un peu de randomisation, gammes, tonal
- Grand final / Conclusion
  - Deux minutes max de démo
  - Allez plus loin...
  - RxJS vs Observable natifs.
  - Merci


## Sources / Références

### Librairies
- [ReactiveX](https://reactivex.io)
- [RxJS](https://github.com/ReactiveX/rxjs)
- [Tonal](https://github.com/tonaljs/tonal)

### Observables natifs
- [La proposal au TC-39](https://github.com/tc39/proposal-observable?tab=readme-ov-file#ecmascript-observable)
- [Observable Native Demo from JeanMeche](https://stackblitz.com/edit/native-observables)
- [Native & RxJS Observables](https://www.youtube.com/watch?v=WLHyzCY_1Tc)

### Aller plus loin, avec des languages de programmation faits pour faire de la musique :
- [Live Coding with algorithmic patterns](https://tidalcycles.org/)
- [Strudel](https://strudel.cc/)

## Inspiration

Je n'ai aucun mérite, j'ai eu l'idée de faire "ma version" de ce talk après avoir vu ce quickie :

- [Making Techno Reactive with RxJS | Max Bendick | ng-conf 2021](https://www.youtube.com/watch?v=gXXW1rqubk0)

Et en creusant, je me suis rendu compte que ça avait déjà été abordé de manière bien plus sérieuses, allez donc voir ces talks :

- [Ian Hansen - RxJS for Metrics and Music](https://www.youtube.com/watch?v=2btEt0W7UxU)
- [Tero Parviainen "Reactive Music Apps in Angular and RxJS"](https://www.youtube.com/watch?v=EB-CreYq1WY)

## TODOLIST

- [ ] finir Plan
- [ ] fix composant marble-diagram
- [ ] slides
- [ ] intégration highlight
- [ ] structure en deux colonnes
- [ ] composant code mirror

