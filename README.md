# Moo-V-Pickr:

![Screenshot Moo-V-Pickr.png](..%2F..%2F..%2F..%2F..%2F..%2FDesktop%2FScreenshot%20Moo-V-Pickr.png)

#### Moo-V-Pickr is een webapplicatie die gebruikers in staat stelt om films te zoeken en te ontdekken. De belangrijkste functie van de app is het zoeken naar hooggewaardeerde films. Dit kan op verschillende manieren, zoals door de naam van een acteur of actrice, het filmgenre, het decennium van uitgave, of de filmtitel in te voeren.

# Benodigdheden

De software Git en Node.js heb je nodig om de Moo-V-Pickr te runnen. Weet je niet of je deze programma's al hebt?
Open de terminal en voer de volgende commando's in.

- `git --version`
- `node -v`
- `npm -v`

Krijg je een versienummer te zien? De software is al geïnstalleerd. Zo niet, installeer deze met behulp van
onderstaande handleidingen.

- [Git Installatiehandleiding](#git-installatiehandleiding)
- [Node.js Installatiehandleiding](#nodejs-installatiehandleiding)

# Installeer Moo-V-Pickr

- [Handleiding voor het Aanmaken van een TMDB API-sleutel](#handleiding-voor-het-aanmaken-van-een-tmdb-api-sleutel)
- [Installatiehandleiding voor Frontend Moo-V-Pickr](#installatiehandleiding-voor-frontend-Moo-V-Pickr)

# Git Installatiehandleiding

### 1. Download Git

- Bezoek de [Git Download Pagina](https://git-scm.com/downloads).
- Kies en download de juiste versie voor uw besturingssysteem (Windows, Mac, Linux/Unix).

### 2. Installatieproces

- Open het gedownloade bestand.
- Volg de installatie-instructies op het scherm.

### 3. Verificatie

- Open een terminal of command prompt.
- Voer `git --version` uit om te bevestigen dat Git correct is geïnstalleerd. Staat er een versienummer? Dan is de
  installatie gelukt.

### Meer Informatie

- Voor gedetailleerde instructies, raadpleeg
  de [Git installatiegids](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

# Node.js Installatiehandleiding

### 1. Download Node.js

- Ga naar de [Node.js website](https://nodejs.org/).
- Download de nieuwste versie van Node.js voor uw besturingssysteem (Windows, Mac, Linux).

### 2. Installatieproces

- Open het gedownloade installatiebestand.
- Volg de aanwijzingen op het scherm om Node.js te installeren.

### 3. Verificatie

- Open een terminal of command prompt.
- Voer `node -v` en `npm -v` uit om te controleren of Node.js en npm (Node Package Manager) correct geïnstalleerd zijn.
  Staat er een versienummer? Dan is de installatie geslaagd

### Meer Informatie

- Voor uitgebreide instructies, bezoek de [Node.js installatiepagina](https://nodejs.org/en/download/).

# Handleiding voor het Aanmaken van een TMDB API-sleutel

Volg deze stappen om een TMDB API-sleutel aan te maken en toe te voegen aan een `.env` bestand. De API key heb je nodig
om toegang te krijgen tot de data van TMDB.

### 1. Account Aanmaken of Inloggen

- Bezoek de [TMDB-website](https://www.themoviedb.org/) en maak een account aan of log in.

### 2. Navigeer naar API-Instellingen

- Ga naar de instellingen van je account en zoek de API-sectie.

### 3. API-sleutel Aanvragen

- Vul het aanvraagformulier in om een API-sleutel te krijgen.

### 4. Ontvang je API-sleutel

- Na goedkeuring ontvang je een API-sleutel.

# Installatiehandleiding voor Frontend Moo-V-Pickr

## Stappen voor Installatie en Uitvoering

### 1. Open je IDE (bijvoorbeeld Webstorm of Visual Studio Code)

### 2. Clone de Repository

- Voer het volgende commando in de terminal om de code te clonen op jouw systeem
- `git clone git@github.com:Danielooo/frontend-moviepicker.git`.

### 2. Ga naar de Projectmap

- Gebruik het commando om naar de project map te gaan:
- `cd frontend-moviepicker`.

### 3. Installeer dependencies

- Gebruik het volgende commando om alle dependencies te installeren
- `npm install`

### 4. Zet de API key in het .env bestand

- Open het .env bestand (niet .env.dist!)
- Zet je eigen unieke API key achter `VITE_APP_AUTH_TOKEN=`
- Bijvoorbeeld: `VITE_APP_AUTH_TOKEN=aB3dE5fG7hJkL9mN0pQrStUvWxYz.CaFeHiJk`

### 5. Start de Applicatie

- Gebruik het volgende commando om de applicatie te starten.
- `npm run dev`

### 6. Open de Applicatie in de browser

- Vite wordt geopend.
- Je kan Moo-V-Picker lokaal runnen door `o` in te voeren in de terminal en op Enter te drukken.
- Moo-V-Picker wordt geopend in je default browser.

## Let op!

Deze handleiding geeft een basisoverzicht van het installatieproces. Voor gedetailleerde informatie of specifieke
configuratie-eisen, raadpleeg de documentatie en online bronnen.