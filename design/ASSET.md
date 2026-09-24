# Provenienza degli asset

Data di realizzazione: 24 settembre 2026. Tutti gli asset del sito sono serviti localmente. Nessuna fotografia o opera delle reference è stata riutilizzata.

| Asset | Origine | Uso e significato |
| --- | --- | --- |
| `logo.webp` | `ricerca/media/logo-ritaglio.png` | Marchio autentico, ridimensionato senza ridisegno |
| `gabriela.webp`, `gabriela-640.webp` | `ricerca/media/team-avatar-instagram.jpg` | Ritratto del profilo ufficiale raccolto nella ricerca |
| `fiore.avif`, `fiore.webp`, `fiore-640.webp` | `design/asset-originali/fiore.png`, generato con image_gen | Opera botanica editoriale; protagonista della copertina, non un oggetto del centro |
| `pelle.webp`, `pelle-640.webp` | `design/asset-originali/pelle.png`, generato con image_gen | Modella sintetica adulta per rappresentare la cura della pelle, non cliente né risultato di un trattamento |
| `piedi.webp`, `piedi-640.webp` | `design/asset-originali/piedi.png`, generato con image_gen | Illustrazione fotografica della cura dei piedi, non caso clinico né risultato del centro |
| Cormorant Garamond 400 normale/corsivo | Pacchetto `@fontsource/cormorant-garamond` | Font dei titoli, SIL Open Font License |
| Manrope variabile | Pacchetto `@fontsource-variable/manrope` | Font del testo, SIL Open Font License |

La ricerca documenta le URL originarie dei materiali reali. I tre originali generati sono conservati separatamente dai file reali. Non sono stati generati interni del centro, attestati, collaboratori o testimonianze. I testi alternativi distinguono i ritratti editoriali dalla fotografia del profilo ufficiale; la copertina decorativa è esclusa dall’albero accessibile.

## Direzione dei prompt

**Fiore.** Fotografia editoriale di lusso per un centro estetico italiano, orizzontale 3:2. Fiore scultoreo sospeso, petali sottili in metallo satinato oro champagne e seta avorio traslucida; spirale asimmetrica nei due terzi destri. Fondo caldo avorio, spazio negativo a sinistra, luce di finestra direzionale, dettaglio macro tattile. Nessun testo, marchio, volto o oggetto di scena.

**Pelle.** Ritratto verticale 3:4 di una donna adulta intorno ai 35 anni, tre quarti rivolti a sinistra, occhi chiusi. Pelle naturale con pori e lentiggini, capelli scuri raccolti, una mano alla clavicola. Luce morbida, fondo avorio, trattamento editoriale naturale. Nessuna persona reale richiesta, nessun logo o testo.

**Piedi.** Fotografia editoriale verticale 3:4 di piedi e caviglie di una persona adulta anonima, inquadratura dal polpaccio. Lino avorio e travertino, unghie naturali corte, anatomia naturale, luce calda soffusa e dettaglio tattile. Nessuna ambientazione clinica, confronto prima/dopo, promessa di risultato, testo o logo.

## Esportazione

`cd sito && node scripts/optimize-assets.mjs` riproduce gli asset web. Immagini WebP in due dimensioni (640 px e fino a 1440 px, senza ingrandire gli originali); copertina anche AVIF a 1440 px. Logo WebP largo 240 px. Il ritratto ufficiale resta al massimo alla sua risoluzione originale di 1024 px. I font sono inclusi dalla build e accompagnati dalle licenze in `public/licenses/`.
