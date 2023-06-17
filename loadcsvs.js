const url_firespots = "inpe_brazilian_amazon_fires_1999_2019.csv";
const url_fenomenos = "el_nino_la_nina_1999_2019.csv";

function carregarCsvFenomenos() {
    return new Promise((res, rej) => {
        fetch(url_fenomenos)
            .then(resposta => resposta.text())
            .then(data => {
                data = data.split("\n")
                data = data.map(i=>i.split(","))
                for (let i = 1; i < data.length; i++) {
                    const fenomeno = data[i]
                    if (fenomeno.length == 1) {
                        continue
                    }
                    const evento = {
                        start: fenomeno[0],
                        end: fenomeno[1],
                        phenomenon: fenomeno[2],
                        severity: fenomeno[3].replace("\r", '')
                    }

                    fenomenoAno[evento.start] = evento
                }
                res(fenomenoAno)
            })
            .catch(rej)
    })
}

function carregarCsvFireSpots() {
    return new Promise((res, rej) => {
        fetch(url_firespots)
            .then(resposta => resposta.text())
            .then(data => {
                data = data.split("\n")
                data = data.map(i=>i.split(","))
                for (let i = 1; i < data.length; i++) {
                    const spotData = data[i]
                    if (spotData.length == 1) {
                        continue
                    }
                    const spot = {
                        year: spotData[0],
                        month: spotData[1],
                        state: spotData[2],
                        lat: spotData[3],
                        long: spotData[4],
                        firespots: spotData[5] ? parseInt(spotData[5].replace("\r", '')) : 0
                    }
                    fireSpots.push(spot)
                    if (!(spot.state in stateMap)) {
                        stateMap[spot.state] = []
                    }
                    stateMap[spot.state][spot.year - 1999] = (stateMap[spot.state][spot.year - 1999] || 0) + spot.firespots
                }
                res(fireSpots)
            })
            .catch(rej)
    })
}

function carregarCsv()  {
    const promises = []
    promises.push(carregarCsvFenomenos())
    promises.push(carregarCsvFireSpots())
    return Promise.all(promises)
}