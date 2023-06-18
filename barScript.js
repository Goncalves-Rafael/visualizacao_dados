const prepararDados = (dados) => {
    //const labels = [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
    const labels = ["AC" ,"AM" ,"AP" ,"MA" ,"MT" ,"PA" ,"RO" ,"RR" ,"TO"]
    const dataset = []
    var rows = dados.split('\n')
    for (var j = 1; j < 10; i++){
        const total = 0
        for (var i = 1; i < rows.length; i++) {
            total = total + rows[i][j]
        }
        dataset.push(total)
    }
    return {
        labels,
        dataset
      };
}

const criarGraficoDeBarras = (dados) => {
    const ctx3 = document.querySelector("#grafico_barras_estado_total_desmatamento");

    const def_data = prepararDados(dados)
    const chart = new Chart(ctx3, {
        type: 'bar',
        
        data: {
            labels: def_data.labels,
            datasets: [
                {
                    label: "Desmatamento total(km2)"
                    backgroundColor: ["#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd"],
                    data: def_data.dataset
                }
            ]
        },

        options: { plugins: {
            title: {
                display: true,
                text: "Desmatamento Total por Estado"
            }
        }}
    })
}