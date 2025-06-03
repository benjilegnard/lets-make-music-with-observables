<!-- LTeX: language=fr-FR -->
# Faisons de la musique réactive avec ~~RxJS~~, des Observables et l’API WebAudio 🎧 🎼 🔊 🎛️



## 🔊 Introduction


### Historique de ce talk

Notes:
- Quand j'ai commencé à travailler sur ce talk, c'était pour enseigner RxJS de manière un peu ludique à mes collègues.
- Sauf que 


### 🤔 C'est quoi un Observable ?


### pattern Observer / gang of for


### Un petit schéma UML


### En JavaScript/TypeScript


### Une fonction vs un callback simple.


### émetteur / récepteur


### Rx et RxJS 


### J'ai menti, monte en voiture loser, on va apprendre les Observables natifs.


### tc39 proposal


### différences principale


### concept de base est le même 
- valeurs au fil du temps


### C'est quoi la musique ?
    - nietche, mozart



## Métronome


### Commencons par le commencement.


### BPM: battements par minutes


### setInterval()


### créer un Observable, constructor
    - code


### écouter un évenement sur un bouton
    - getElementById().when("click").subscribe()


### subscribe() + new Sound


### WebAudio API
    - apparté, la musique pour un ordinateur
    - webAudio : source / destination



## Rythme / Batterie


### ok j'ai un Métronome
    - temps / 4/8, ternaire, 5/7
    - boite à rythme


### switchMap() / filter()


### grosse caisse sur le premier temps


### filter() / modulos


### snare sur le 2e temps


### lire un son


### différences d'api



## Basse


### oscillator


### sine wave


### la musique, pour un ordinateur


### des MATHS


### le piano


### notes change


### theremin


### apparté, Tonal.js: abstraction


### apparté Tone.js: au delà de l'api webaudio



## Synthétiseur / Accords


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
- utilisable sur les objets du DOM natifs
- juste les briques de base pour l'instant
- API Builder-oriented
- ⚠️ API asynchrone : les promesses.


### Y U NO pipe() ?

- // TODO ceci n'est pas une pipe.


### Des librairies


### RxJS vs Observable natifs.
- à retenir : la base est là, pas l'api rxjs
- compatibilité observable natifs / itérateurs asynchrone
- rxjs 8



### Support

- Chrome-only
- Tests : https://wpt.fyi/results/dom/observable?label=experimental&label=master&aligned 



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
