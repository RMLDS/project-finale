# Projekto paleidimo žinynas

Projektas kurtas su React - Create React App Aplinkoje [Create React App](https://github.com/facebook/create-react-app).

## Paleidimas

Atsidare terminalą projekto aplanke paleiskite skriptus tokia tvarka (kiekvienas skriptas turi būti paleistas naujame terminale):

### `npm run db`

Paleis JSON serverį duomenims.\
Peržiūra: [http://localhost:8080](http://localhost:8080).

### `npm run server`

Paleis API serverį perduoti duomenims.\
Peržiūra: [http://localhost:5150](http://localhost:5150).

### `npm run start`

Paleis pagrindinį projekto tinklapį.\
Peržiūra: [http://localhost:3000](http://localhost:3000).

* Pastaba: Package JSON faile prie kiekvieno skripto yra prierašas "BROWSER=none", kad paleidus skriptus jie automatiškai neatsidarytų naršyklės languose. Jei projektą leidžiate Windows aplinkoje nutrinkite šias dalis ir tik tuomet paleidinėkite skriptus.