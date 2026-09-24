# Beauty Obsession

Sito multipagina del centro estetico a Boffalora d’Adda. Direzione: **Il tempo di rifiorire**, con una scultura floreale in oro e seta che si trasforma durante lo scorrimento.

## Avvio

Richiede Node.js 22.12+ e npm.

```sh
cd sito
npm ci
npm run dev
```

Sviluppo: http://127.0.0.1:4173/. Il comando genera le quattro pagine prima di avviare Vite.

```sh
npm run build
npm run preview -- --port 4174
```

Anteprima della build: http://127.0.0.1:4174/. Le pagine sono `/`, `/trattamenti/`, `/il-centro/`, `/contatti/`.

## Modifiche

| File | Contenuto |
| --- | --- |
| `scripts/generate-pages.mjs` | Struttura delle pagine, componenti condivisi, testi, metadati |
| `src/content.js` | Servizi, recensioni e collegamenti ufficiali |
| `src/style.css` | Token, tipografia e tutti i layout responsive |
| `src/main.js` | GSAP/ScrollTrigger, menu, recensioni, dettagli e compositore |
| `src/bloom.js` | Superficie WebGL nativa della copertina desktop |
| `scripts/optimize-assets.mjs` | Esportazione degli originali in WebP/AVIF |

Gli HTML sono generati: modificare il generatore e usare `npm run pages` o riavviare `npm run dev`. I file in `src/` hanno aggiornamento automatico durante lo sviluppo. Nessun framework UI o servizio esterno è necessario a runtime. Font e immagini sono locali.

La scena usa un'unica timeline reversibile. Su touch la transizione a iride usa CSS e scroll nativo; su desktop il modulo WebGL viene caricato al primo scorrimento. Pausa e preferenza di movimento ridotto rimuovono il pin e mantengono una copertina statica. In assenza di WebGL funziona la transizione CSS.

## Verifica

Con l’anteprima sulla porta 4174 attiva:

```sh
npm run check
```

Verifica sintassi JavaScript, risposta delle quattro pagine, immagini, collegamenti interni e ancore. Le prove browser e il rapporto Lighthouse sono in `../design/evidenze/`; il resoconto leggibile è `../design/VERIFICHE.md`.

## Contenuti e stato

La ricerca originale è in `../ricerca/`. Direzione e provenienza immagini sono in `../design/DIREZIONE.md` e `../design/ASSET.md`. Logo e ritratto provengono dai materiali del centro; fiore, pelle e piedi sono immagini editoriali generate per questo progetto.

Il compositore prepara e copia un messaggio locale. Il visitatore apre Instagram e lo invia personalmente; disponibilità e prenotazione sono concordate con il centro. Il sito non invia moduli, non raccoglie dati su un server e non incorpora analytics o social.

La build pubblica usa `SITE_BASE=/beauty-obsession/ npm run build`: aggiunge il prefisso alle rotte, usa URL canonici e metadati social assoluti e consente l’indicizzazione. La build locale standard conserva `noindex,nofollow`. Il dato Google 5,0 / 88 recensioni è lo snapshot del 24 settembre 2026. I numeri telefonici discordanti nella ricerca non sono stati scelti arbitrariamente.

La ricerca completa, gli screenshot di verifica e il PDF di processo rimangono solo nel workspace locale; nella repository pubblica sono inclusi gli asset originali necessari a ricostruire la build. La pubblicazione usa il workflow nella radice della repository e la cartella `dist` generata in CI.
