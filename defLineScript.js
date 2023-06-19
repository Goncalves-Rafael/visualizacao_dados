const prepararDadosDesmatamento = () => {
    const labels = [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
    const state_label = ["AMAZONAS", "MARANHAO", "MATO GROSSO", "PARA", "RONDONIA", "RORAIMA", "AMAPA", "TOCANTINS", "ACRE"]
    const datasets = []
    
    for (let j = 0; j < state_label.length; j++){
        datasets.push({
            label: state_label[j],
            data: desmatamentoPorEstado[state_label[j]]
        })
    }
    return {
        labels,
        datasets
    };
}

const atualizarGraficoDeLinhasDesmatamento = () => {
    // gráfico 3 - gráfico de linhas
    const ctx3 = document.querySelector("#grafico_linhas_estado_ano_desmatamento");

    const chart = new Chart(ctx3, {
        // type = tipo do gráfico
        type: 'line',
        
        // data = recebe os dados
        data: prepararDadosDesmatamento(),

        // options = options de configuração do gráfico
        options: { plugins: {
            title: {
                display: true,
                text: "Desmatamento ao Longo dos Anos por Estado (Km2)"
            }
        }}
    })

    chart.canvas.onclick = (event) => {
        const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true}, true)
        if (points[0]) {
            const { datasetIndex } = points[0]
            updateSelectedDataset(chart, datasetIndex)
        }
    }

    charts.push(chart)
}


