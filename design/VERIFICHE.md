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

Repository pubblica: `https://github.com/Fog-coder/beauty-obsession`, branch `main`. Il [workflow Pages](https://github.com/Fog-coder/beauty-obsession/actions/runs/35991217878) ha compilato e pubblicato la prima versione con esito positivo. URL: `https://fog-coder.github.io/beauty-obsession/`.

Sull’URL pubblico le quattro rotte, l’asset AVIF, robots.txt e sitemap.xml hanno risposto HTTP 200. Nel browser mobile sono stati verificati menu, pagina trattamenti, selezione del servizio nei contatti, immagini caricate e assenza di overflow o errori JavaScript. Nel browser desktop la scena WebGL si è attivata e il secondo capitolo è risultato visibile. La home pubblica ha canonical corretto e non contiene `noindex`. Evidenza locale: `evidenze/live-pages.txt`.
