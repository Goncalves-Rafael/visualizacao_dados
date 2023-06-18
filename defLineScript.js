const prepararDados = (dados) => {
    const labels = [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
    const state_label = ["Acre" ,"Amazonas" ,"Amapá" ,"Maranhão" ,"Mato Grosso" ,"Pará" ,"Rondônia" ,"Roraima" ,"Tocantins"]
    const datasets = []
    var rows = dados.split('\n')
    for (var j = 1; j < 10; i++){
        const state_data = []
        for (var i = 1; i < rows.length; i++) {
            state_data.push(rows[i][j])
        }
        datasets.push({
            label: state_label[j-1],
            data: state_data
          })
    }
    return {
        labels,
        datasets
      };
}

const atualizarGraficoDeLinhas = (dados) => {
    // gráfico 3 - gráfico de linhas
    const ctx3 = document.querySelector("#grafico_linhas_estado_ano_desmatamento");

    const chart = new Chart(ctx3, {
        // type = tipo do gráfico
        type: 'line',
        
        // data = recebe os dados
        data: prepararDados(dados),

        // options = options de configuração do gráfico
        options: { plugins: {
            title: {
                display: true,
                text: "Desmatamento ao Longo dos Anos por Estado"
            }
        }}
    })

    const originalColors = chart.config.data.datasets.map(dataset => {
        return {
            bColor: dataset.borderColor,
            bgColor: dataset.backgroundColor
        }
    })

    chart.canvas.onclick = (event) => {
        const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true}, true)
        if (points[0]) {
            const { datasetIndex } = points[0]
            if (selectedLine == datasetIndex) {
                selectedLine = null
                selectedState = null
            } else {
                selectedLine = datasetIndex
                selectedState = chart.config.data.datasets[datasetIndex].label
            }
            for (let i = 0; i < chart.config.data.datasets.length; i++) {
                if (selectedLine == null || i == datasetIndex) {
                    chart.config.data.datasets[i].borderColor = originalColors[i].bColor
                    chart.config.data.datasets[i].backgroundColor = originalColors[i].bgColor
                } else {
                    chart.config.data.datasets[i].borderColor = 'rgb(218, 223, 225)'
                    chart.config.data.datasets[i].backgroundColor = 'rgb(218, 223, 225)'
                }
            }
            
            chart.update()
            updateMapData()
        }
    }
}


