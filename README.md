## Installazione del Database
Dopo aver clonato il progetto, importa il database con:

### Opzione 1: Con phpMyAdmin
1. Apri phpMyAdmin e seleziona il database `voli_db`
2. Vai su **Importa** e scegli `database_dump.sql`
3. Clicca su **Esegui**


## Come ho collegato tabelle con chiavi relazionali

1. PRIMA QUERY

-- Aggiungi la colonna country_id nella tabella airports
ALTER TABLE airports ADD COLUMN country_id INT AFTER country;

-- Popola la colonna country_id con i dati dalla tabella countries
UPDATE airports a 
JOIN countries c ON a.country = c.country_name 
SET a.country_id = c.id;

-- Rimuovi la colonna country
ALTER TABLE airports DROP COLUMN country;

-- Aggiungi il vincolo di chiave esterna per country_id
ALTER TABLE airports ADD FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE;

2. SECONDA QUERY

-- Aggiungi la colonna country_id nella tabella airlines
ALTER TABLE airlines ADD COLUMN country_id INT AFTER country;

-- Popola la colonna country_id con i dati dalla tabella countries
UPDATE airlines a 
JOIN countries c ON a.country = c.country_name 
SET a.country_id = c.id;

-- Rimuovi la colonna country
ALTER TABLE airlines DROP COLUMN country;

-- Aggiungi il vincolo di chiave esterna per country_id
ALTER TABLE airlines ADD FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE;
