# Beauty Obsession · Il tempo di rifiorire

## Incarico e criterio di riuscita
Sito completo del centro Beauty Obsession, con la qualità visiva e il movimento delle reference indicate dall'utente. Le pagine devono restare leggibili, navigabili e utilizzabili anche senza animazioni. Il sito è pubblicato su GitHub Pages su richiesta dell'utente. Nessun contatto commerciale è stato effettuato.

## Fonti
Ricerca in ../ricerca, processo PDF in ../docs. Analisi live delle dieci reference in evidenze-reference; codice delle due repo locali letto in sola lettura. Dai progetti A Center riprendiamo lo schema di una timeline centrale, il pin in ordine di pagina, il caricamento progressivo, la navigazione accessibile e lo scroll nativo su touch. Non copiamo contenuti, modelli, fotografie o marchi delle reference.

## Direzione
Sito editoriale per un pubblico locale interessato a estetica e benessere. VARIANCE 9, MOTION 8, DENSITY 3. Avorio #F7EEE8, oro #A57E44, bruno #382A20: la famiglia cromatica viene dalla ricerca, non da un preset. Titoli Cormorant Garamond, corpo Manrope, font locali. Logo raster autentico, conservato senza ridisegno. Firma visiva: tipografia grande e sottile, bordi quasi invisibili, immagini a vivo, ritmi asimmetrici. Un unico sistema condiviso su quattro pagine.

## Architettura
- /: copertina cinematica, manifesto, mondi dei trattamenti, specializzazione piedi, fiducia, invito.
- /trattamenti/: selezione per area, dettagli dei nove servizi verificati, domande frequenti, richiesta appuntamento.
- /il-centro/: filosofia e Gabriela, ritratto ufficiale, formazione dichiarata, testimonianze.
- /contatti/: sede, orari verificati, accessibilità, canali ufficiali e compositore di richiesta da copiare facoltativamente su Instagram. Nessun invio automatico o prenotazione simulata.

## Esperienza protagonista
Un'opera botanica in oro e seta si avvicina e si trasforma in un'immagine editoriale di cura. Su desktop una superficie WebGL applica rifrazione, distorsione radiale e rivelazione progressiva alla scena; GSAP coordina scena e testo tramite un solo progresso. I due capitoli sono reversibili con lo scroll. Il cursore influenza delicatamente la superficie. Mobile: ritaglio verticale, trasformazione CSS a iride, corsa più breve e touch nativo. Con WebGL assente resta la trasformazione CSS. Con movimento ridotto o pausa richiesta restano poster e contenuti statici, senza pin. Il renderer desktop viene importato al primo scorrimento, si ferma fuori viewport e a scheda nascosta e libera le risorse alla disattivazione.

## Processo PDF applicato
1. Vite, GSAP + ScrollTrigger e Lenis su pointer fine.
2. WebGL nativo solo nella scena protagonista desktop, import dinamico al primo scroll; nessuna libreria 3D o modello pesante.
3. Trasformazione visiva guidata da uno stato unico; poster sempre disponibile. Non serve scaricare centinaia di frame per questa regia.
4. Pin, scrub, reveal di testo e transizioni coerenti.
5. Ingresso breve legato ad asset reali, senza percentuale fittizia o attese artificiali.
6. Palette e curva condivise.
7. Artwork generati con image_gen e conservati localmente con provenienza. Le foto del centro restano autentiche.
8. Verifica browser su desktop/mobile, tastiera, movimento ridotto, link, build e peso asset.

## Vincoli fattuali
Nessun prezzo, data di apertura, promessa medica, risultato garantito o interno inventato. Indirizzo via San Martino 10: convergente in Maps, FB, post e vetrina. Telefoni esclusi dalla CTA perché discordanti. La qualifica RUCK è attribuita al centro. Testimonianze brevi dalla ricerca, senza inventare nomi o immagini cliente. Foto editoriali non sono risultati del centro. Nessun numero di recensioni aggiornato implicitamente: snapshot 24/09/2026 documentato.

## Piano
1. Token, layout multipagina, contenuti e asset locali.
2. Regia hero e interazioni dei trattamenti, menu, compositore.
3. Revisione browser, correzioni responsive e accessibilità.
4. Build finale, evidenze e note prima della pubblicazione.
