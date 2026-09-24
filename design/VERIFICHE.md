# Verifiche della consegna

24 settembre 2026. Build locale servita da Vite Preview su `http://127.0.0.1:4174/`. Browser Aside/Chromium, viewport emulate: 1440×900, 768×1024, 390×844 e 360×780. Il controllo mobile usa emulazione, non un telefono fisico.

## Pagine e continuità

| Pagina | Accesso diretto | Controllo visivo | Errori JS / overflow |
| --- | --- | --- | --- |
| Home | OK | Desktop, 390 e 360; copertina, transizione, rituali, ritratto | Nessuno nelle prove |
| Trattamenti | OK, anche con ancora | Desktop e 390; copertina, selettore aree, dettagli | Nessuno nelle prove |
| Il centro | OK | Desktop e 390; titolo, ritratto, testo | Nessuno nelle prove |
| Contatti | OK, anche con servizio e ancora | Desktop, tablet e 390; orari e compositore | Nessuno nelle prove |

Le pagine condividono logo, palette, font, header, pulsanti, spaziatura, footer e curve di movimento. Le copertine interne sono varianti dello stesso sistema: ritratto per il centro, pelle per i trattamenti, tipografia per i contatti.

## Interazioni osservate

- Scorrimento della scena desktop, apertura progressiva del secondo capitolo e ritorno alla copertina iniziale.
- Superficie WebGL attivata al primo scroll; animazione CSS a iride su mobile.
- WebGL reso indisponibile nel browser: la scena CSS resta visibile e non produce errori JavaScript.
- Pausa: nessun pin e contenuti statici. Ripresa: un solo pin ricreato.
- `prefers-reduced-motion: reduce`: canvas nascosto e zero pin.
- Menu mobile: apertura, chiusura, Tab e Shift+Tab confinati nel dialogo, Escape e ritorno del focus al pulsante.
- Cambio immagine al passaggio sulle aree trattamento; cambio recensione e contatore.
- Selezione del servizio tramite query string, testo aggiornato con la disponibilità, copia del messaggio e stato di conferma. Il collegamento Instagram punta al profilo ufficiale. Non è stato inviato alcun messaggio.
- Le immagini richieste sono caricate; la copertina usa la nuova variante AVIF. Collegamenti interni, ancore e immagini verificati automaticamente sulle quattro pagine.
- Due navigazioni consecutive da Home a Il centro e ritorno con la cronologia: ripristino dalla cache del browser, un solo pin e nessun errore JavaScript.

## Build e audit

`npm run build` e `npm run check`: completati. Audit npm: nessuna vulnerabilità rilevata nelle dipendenze installate durante la realizzazione; nessuna nelle dipendenze di produzione al controllo finale.

Lighthouse mobile sulla home, impostazioni simulate predefinite, browser Chromium/Brave headless:

| Misura | Risultato |
| --- | --- |
| Performance | 87 / 100 |
| Accessibilità automatica | 100 / 100 |
| Best Practices | 100 / 100 |
| SEO | 66 / 100 |
| First Contentful Paint | 1,8 s |
| Largest Contentful Paint | 3,8 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0 |

Questi punteggi appartengono alla prima build locale. Il risultato SEO era limitato da `noindex,nofollow` e dal blocco in robots.txt dell’anteprima: la build Pages successiva ha URL canonici, sitemap e indicizzazione abilitata. La prestazione mobile resta migliorabile nel caricamento dell’immagine principale; non è una misura sul campo. Il punteggio di accessibilità non sostituisce una verifica con tecnologie assistive reali.

Il JavaScript principale è circa 57 KB gzip; il modulo grafico dinamico circa 2,4 KB gzip. La copertina AVIF pesa circa 97 KB. La variante desktop non scarica librerie 3D generiche.

## Evidenze

- `evidenze/consegna.txt`: verifica finale di asset, focus, compositore, fallback WebGL e movimento ridotto.
- `evidenze/cronologia.txt`: ripristino ripetuto dalla cache di navigazione sulla build conclusiva.
- `evidenze/verifica-finale.txt`: controllo responsive, pausa/ripresa e scena desktop/mobile. Il problema di focus annotato in questo rapporto precedente è risolto e verificato in `consegna.txt`.
- `evidenze/collaudo.txt`: dettagli delle prove funzionali, inverso dello scroll e clipboard.
- `evidenze/lighthouse-mobile.json`: rapporto Lighthouse dell’ultima revisione visiva.
- `evidenze/copertina-desktop.jpg`, `copertina-mobile.jpg`, `fallback-webgl.jpg`, `dettagli-mobile.jpg`, `appuntamento-mobile.jpg`: screenshot finali.
- `evidenze-reference/`: raccolta di osservazioni e screenshot delle reference visitate.

La verifica tecnica e la revisione visiva dell’agente sono completate. La pubblicazione su Pages segue una seconda build con prefisso `/beauty-obsession/`, verificata sulle quattro rotte e nei browser. Questo documento non attribuisce al cliente un’approvazione estetica.

## Pubblicazione verificata

### Correzione della scena mobile

Il ritaglio del fiore era applicato al contenitore condiviso con il ritratto: a 390×844 px il ritratto iniziava a y=143 px, mentre la rotazione del fiore lo estendeva fino a y=42 px. Il ritaglio è stato spostato sul solo poster del fiore, mantenendone posizione e dimensioni; il ritratto e la superficie opaca di rivelazione occupano ora tutta la scena.

Verificati 360×780, 390×844, 430×932 e 390×640 px: immagine finale e sfondo coprono il contenitore dall’alto al basso, la maschera aperta comprende tutti gli angoli e il ritorno allo scroll iniziale ripristina il fiore alle dimensioni originali. Nessun overflow o errore JavaScript. Verificate anche scena WebGL desktop e modalità movimento ridotto. Evidenze locali: `evidenze/mobile-hero-prima.txt`, `evidenze/mobile-hero-dopo.txt` e relativi screenshot.

Repository pubblica: `https://github.com/Fog-coder/beauty-obsession`, branch `main`. Il [workflow Pages](https://github.com/Fog-coder/beauty-obsession/actions/runs/35991217878) ha compilato e pubblicato la prima versione con esito positivo. URL: `https://fog-coder.github.io/beauty-obsession/`.

Sull’URL pubblico le quattro rotte, l’asset AVIF, robots.txt e sitemap.xml hanno risposto HTTP 200. Nel browser mobile sono stati verificati menu, pagina trattamenti, selezione del servizio nei contatti, immagini caricate e assenza di overflow o errori JavaScript. Nel browser desktop la scena WebGL si è attivata e il secondo capitolo è risultato visibile. La home pubblica ha canonical corretto e non contiene `noindex`. Evidenza locale: `evidenze/live-pages.txt`.

### Rivelazione mobile a petali

La maschera circolare mobile è sostituita da un tracciato CSS con sette petali arrotondati, coerenti con i sette lobi della scena desktop. Il punto di apertura tiene conto del ritaglio `object-fit: cover` del poster e si avvicina al cuore del fiore. Il raggio finale comprende anche gli angoli nelle rientranze tra i petali.

Verifica su Chromium con viewport mobile emulate 360×780, 390×844, 430×932 e 390×640 px: tracciato a petali attivo, quattro angoli inclusi nella maschera finale, sfondo e ritratto a piena altezza, nessun overflow o errore JavaScript. Il ritorno all’inizio richiude completamente la maschera. Controllati visivamente tre momenti intermedi e la scena finale a 390×844. Scena WebGL desktop e movimento ridotto verificati. Build Pages e controllo collegamenti delle quattro pagine superati. Evidenze locali: `evidenze/mobile-petali.txt`, `evidenze/petali-fase-*.jpg`, `evidenze/petali-completa.jpg`.

### Caricamento del ritratto e rivelazione mobile

Riprodotto sul sito pubblicato un caso non coperto dalla precedente verifica: trattenendo la risposta della foto della ragazza e scorrendo subito, la maschera si apriva su uno sfondo vuoto e il ritratto appariva in seguito, di colpo. Il test della maschera chiusa prima della disponibilità dell’immagine falliva sulla versione `a26c7f5`.

Il ritratto della hero ora viene richiesto subito. Su mobile la scena si ferma al momento precedente alla rivelazione finché `HTMLImageElement.decode()` non completa; poi raggiunge gradualmente il progresso dello scroll. La disponibilità della foto controlla anche il secondo capitolo, mantenendo insieme testo e immagine. Un cambio della sorgente responsive ritenta la decodifica al caricamento; pausa e smontaggio annullano il recupero.

Verifica automatizzata su Chromium e WebKit locali, viewport mobile emulata 390×844: foto trattenuta, maschera completamente chiusa e secondo capitolo nascosto; dopo lo sblocco, apertura distribuita su oltre otto fotogrammi distinti, posizione del ritratto stabile e copertura finale dei quattro angoli. Controllati ritorno indietro, pausa/ripresa e movimento ridotto. Verificato anche il passaggio da desktop 1440×900 a mobile. Non è una prova su iPhone fisico. Evidenze locali: `evidenze/petal-loading-red.txt`, `evidenze/petal-loading-green.txt`, `evidenze/petal-resize-green.txt` e screenshot `*-loading-*.png`.
