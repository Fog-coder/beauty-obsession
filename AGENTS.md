# Workflow Git

## Regole obbligatorie

1. **Fetch da main prima di iniziare**: prima di ogni task, eseguire `git fetch origin` e aggiornare `main` (`git pull origin main` o equivalente) per partire sempre dallo stato aggiornato.
2. **Branch dedicato per task**: ogni task va svolto su un branch apposito creato da `main` aggiornato, mai direttamente su `main`.
3. **Push immediato**: il branch va pushato su GitHub subito dopo la creazione (o al primo commit), non solo a lavoro finito.
4. **PR solo su richiesta esplicita**: non aprire pull request in autonomia. Aprirle solo quando l'utente lo chiede esplicitamente.
