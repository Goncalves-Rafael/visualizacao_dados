const prepararDados = () => {
    const labels = [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
    const datasets = []
    for (const state in stateMap) {
        datasets.push({
            label: state,
            data: stateMap[state]
          })
    }
    return {
        labels,
        datasets
      };
}

const atualizarGraficoDeLinhas = () => {
    // gráfico 3 - gráfico de linhas
    const ctx3 = document.querySelector("#grafico_linhas_estado_ano_firespots");

    const chart = new Chart(ctx3, {
        // type = tipo do gráfico
        type: 'line',
        
        // data = recebe os dados
        data: prepararDados(),

        // options = options de configuração do gráfico
        options: { plugins: {
            title: {
                display: true,
                text: "Focos de Incêndio por Ano e Estado"
            }
        }}
    })

    chart.config.data.datasets.forEach(dataset => {
        originalColors[dataset.label] = {
            bColor: dataset.borderColor,
            bgColor: dataset.backgroundColor
        }
    })

    originalColors["AMAPA"] = {
        bColor: "#6e777a",
        bgColor: "#939ea3"
    }

    originalColors["TOCANTINS"] = {
        bColor: "#ba4343",
        bgColor: "#e65353"
    }

    originalColors["ACRE"] = {
        bColor: "#44ad46",
        bgColor: "#55d957"
    }

    chart.canvas.onclick = (event) => {
        const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true}, true)
        if (points[0]) {
            const { datasetIndex } = points[0]
            updateSelectedDataset(chart, datasetIndex)
        }
    }
    charts.push(chart)
}


