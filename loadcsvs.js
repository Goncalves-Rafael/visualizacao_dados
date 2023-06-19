const url_firespots = "inpe_brazilian_amazon_fires_1999_2019.csv";
const url_fenomenos = "el_nino_la_nina_1999_2019.csv";
const url_desmatamento = "def_area_2004_2019.csv";

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
                    spot.value = spot.firespots
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

function carregarCsvDesmatamento() {
    return new Promise((res, rej) => {
        fetch(url_desmatamento)
            .then(resposta => resposta.text())
            .then(data => {
                desmatamentoPorEstado["ACRE"] = []
                desmatamentoPorEstado["AMAZONAS"] = []
                desmatamentoPorEstado["AMAPA"] = []
                desmatamentoPorEstado["MARANHAO"] = []
                desmatamentoPorEstado["MATO GROSSO"] = []
                desmatamentoPorEstado["PARA"] = []
                desmatamentoPorEstado["RONDONIA"] = []
                desmatamentoPorEstado["RORAIMA"] = []
                desmatamentoPorEstado["TOCANTINS"] = []

                data = data.split('\n')
                data = data.map(i=>i.split(","))
                
                for (let i = 1; i < data.length; i++) {
                    const desmatamentoData = data[i]
                    if (desmatamentoData.length == 1) {
                        continue
                    }
                    const [ ano, AC, AM, AP, MA, MT, PA, RO, RR, TO ] = desmatamentoData
                    desmatamentoPorEstado["ACRE"].push(parseInt(AC))
                    desmatamentoPorEstado["AMAZONAS"].push(parseInt(AM))
                    desmatamentoPorEstado["AMAPA"].push(parseInt(AP))
                    desmatamentoPorEstado["MARANHAO"].push(parseInt(MA))
                    desmatamentoPorEstado["MATO GROSSO"].push(parseInt(MT))
                    desmatamentoPorEstado["PARA"].push(parseInt(PA))
                    desmatamentoPorEstado["RONDONIA"].push(parseInt(RO))
                    desmatamentoPorEstado["RORAIMA"].push(parseInt(RR))
                    desmatamentoPorEstado["TOCANTINS"].push(parseInt(TO))
                }
                res(desmatamentoPorEstado)
            })
            .catch(rej)
    })
}

function carregarCsv()  {
    const promises = []
    promises.push(carregarCsvFenomenos())
    promises.push(carregarCsvFireSpots())
    promises.push(carregarCsvDesmatamento())
    return Promise.all(promises)
}