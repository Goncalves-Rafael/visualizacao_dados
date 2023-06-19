const prepararDadosBarras = () => {
    const labels =  ["AMAZONAS", "MARANHAO", "MATO GROSSO", "PARA", "RONDONIA", "RORAIMA", "AMAPA", "TOCANTINS", "ACRE"]
    const data = []
    const backgroundColor = []
    const borderColor = []

    for (let j = 0; j < labels.length; j++){
        data.push(desmatamentoPorEstado[labels[j]].reduce((partialSum, a) => partialSum + a, 0))
        backgroundColor.push(originalColors[labels[j]].bgColor)
        borderColor.push(originalColors[labels[j]].bColor)
    }
    return {
        labels,
        datasets: [{
            label: "",
            data,
            backgroundColor,
            borderColor
        }]
      };
}

const criarGraficoDeBarras = () => {
    const ctx3 = document.querySelector("#grafico_barras_estado_total_desmatamento");

    const chart = new Chart(ctx3, {
        type: 'bar',
        
        data: prepararDadosBarras(),

        options: { plugins: {
            title: {
                display: true,
                text: "Desmatamento Total por Estado(Km2)"
            },
            legend: {
                display: false
            }
        }}
    })
}