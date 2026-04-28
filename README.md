# react-msSQL-project

Õppetöö jaoks loodud näidisrakendus, mis kasutab Reacti frontendina, Node.js-i backendina ja MS SQL Serverit andmebaasina.

## Käivitamisjuhend
### Eeldused
Veendu, et sinu arvutis on:

1. Node.js ja npm

2. MS SQL Server (kas lokaalselt või Dockeris)

Alustamiseks klooni projekt:
```
git clone https://github.com/SwagMuffin88/react-msSQL-project.git
```

Andmebaasi seadistamiseks on kaks valikut sõltuvalt sellest, kas kasutad Dockerit või lokaalset SQL Serverit:

### Lokaalne MS SQL server:
1. Veendu, et SQL Server Browser teenus töötab.

2. Veendu, et SQL Authentication on lubatud (mitte ainult Windows Authentication).

3. Loo kasutaja (nt nimega "sa") ja määra sellele parool või kasuta olemasolevat kontot.

4. Kontrolli, et server kuulab pordil 1433.

### MS SQL konteiner Dockeri kaudu
Käivita terminalis käsklus:
```
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=SinuTugevParool!#' \
   -p 1433:1433 --name mssql_server \
   -d mcr.microsoft.com/mssql/server:2022-latest
```

### Backendi seadistamine ja ```.env``` fail
1. Projekti juurkaustas käivita käsklused:
```
cd backend
npm install
```

2. Loo fail .env. Muuda parool ja serveri nimi vastavalt oma lokaalsele seadistusele!

```
PORT=5000
DB_SERVER=localhost
DB_USER=sa
DB_PASSWORD=sinu_enda_parool
DB_DATABASE=master
DB_PORT=1433
```

3. Käivita backend:
```npm run dev```

PS: Backendi käivitamisel luuakse ka vajalik tabeli struktuur.

### Frontendi käivitamine
Terminalis:
```
cd ..
cd frontend
npm install
```
Seejärel: ```npm run start```.
Kasutajaliides on nüüd kättesaadav aadressil http://localhost:5173 ja kuulab API aadressit http://localhost:5000.