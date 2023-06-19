// CONFIGURAR CORES DOS FENOMENOS
const COLORS_FENOMENOS = {
    'El Nino': {
        'Weak': '#b4a7d6',
        'Moderate': '#8e7cc3',
        'Strong': '#674ea7',
        'Very Strong': '#351c75',
    },
    'La Nina': {
        'Weak': '#f9cb9c',
        'Moderate': '#f6b26b',
        'Strong': '#e69138',
        'Very Strong': '#b45f06',
    },
}

const DEFAULT_COLOR = "#bbb" // 'rgb(144, 202, 249)'

function filterByState(val) {
    return selectedState == null || val == selectedState
}

function filterByYear(val) {
    return selectedYear == null || val == selectedYear
}

function updateMapData() {
    mapSeries.data(fireSpotsDataset.filter('state', filterByState).filter('year', filterByYear))
    fenomenoSeries.data(getStatesDataSets())
}

function scale (number, inMin, inMax, outMin, outMax) {
    if (number > inMax) {
        number = inMax
    } else if (number < inMin) {
        number = inMin
    }
    return parseInt((number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin)
}

function getCurrentColor() {
    const fenomenoAtual = fenomenoAno[selectedYear]
    if (fenomenoAtual != null) {
        return COLORS_FENOMENOS[fenomenoAtual.phenomenon][fenomenoAtual.severity]
    }
    return DEFAULT_COLOR
}

function getStatesDataSets() {
    let currentColor = getCurrentColor()
    
    return anychart.data.set(
        [
            {"id":"BR.AC","value":stateMap["ACRE"][selectedYear - 1999], "fill": currentColor},
            {"id":"BR.AM","value":stateMap["AMAZONAS"][selectedYear - 1999], "fill": currentColor},
            {"id":"BR.MA","value":stateMap["MARANHAO"][selectedYear - 1999], "fill": currentColor},
            {"id":"BR.PA","value":stateMap["PARA"][selectedYear - 1999], "fill": currentColor},
            {"id":"BR.RO","value":stateMap["RONDONIA"][selectedYear - 1999], "fill": currentColor},
            {"id":"BR.TO","value":stateMap["TOCANTINS"][selectedYear - 1999], "fill": currentColor},
            {"id":"BR.MT","value":stateMap["MATO GROSSO"][selectedYear - 1999], "fill": currentColor},
            {"id":"BR.RR","value":stateMap["RORAIMA"][selectedYear - 1999], "fill": currentColor},
            {"id":"BR.AP","value":stateMap["AMAPA"][selectedYear - 1999], "fill": currentColor}
        ]
    );
}

function loadMap() {
    // create map
    var map = anychart.map();
    // set geo data, you can find this map in our geo maps collection
    // https://cdn.anychart.com/#maps-collection
    map.geoData(anychart.maps['brazil']);
   
    // create data set
    map.unboundRegions().fill('#eee');
    map.title().useHtml(true).hAlign('center');
    map.title('<span style="font-size: 18px;">Mapa de Focos de Incêndio</span><br><span style="font-size:12px;">Mova o mouse para ver as ocorrências em cada estado</span>');

    fenomenoSeries = map.choropleth(getStatesDataSets());
    fenomenoSeries.labels().fontColor('black');
    fenomenoSeries.normal().stroke('#e0e0e0')
    fenomenoSeries.hovered().fill("#eee").stroke(getCurrentColor)
    fenomenoSeries.tooltip().format(el => `Focos de Incêndio em ${selectedYear}: ${el.value}`)

  
    fireSpotsDataset = anychart.data.set(fireSpots).mapAs({size: "firespots"});

    let min = 1;
    let max = 580;
    mapSeries = map.bubble(fireSpotsDataset.filter('year', filterByYear));
    
    mapSeries
        .name('Focos de Incêndio')
        .fill((el) => {
            if (el.index >= 0) {
                const { firespots } = el.iterator.f;
                return `rgba(${scale(firespots, min, max, 140, 255)}, 0, 0, 0.3)`;
            }
            return 'red';
        })
        .stroke((el) => {
            if (el.index >= 0) {
                const { firespots } = el.iterator.f;
                return `rgb(${scale(firespots, min, max, 140, 255)}, 0, 0)`;
            }
            return 'red';
        })
        .type('circle')
        .labels(false)
        .selectionMode('none');
    
    map.minBubbleSize("1%");
    map.maxBubbleSize("5%");

    mapSeries.hovered().stroke('2 #fff').size(8);

    // sets Tooltip for series
    mapSeries.tooltip().titleFormat("Coordenadas").format((el, el2) => {
        return `Lat: ${el.lat}\nLong: ${el.long}\nFocos de Incêndio: ${el.value}\n`
    })
    
    mapSeries
        .legendItem()
        .iconType('circle')
        .iconFill('Red')
        .iconStroke('2 #E1E1E1');

    // turns on the legend for the sample
    var legend = map.legend();
    legend.position("right");
    legend.align("middle");
    legend.itemsLayout("vertical");
    legend.itemsFormatter(function(items){
        const baseItem = items.shift()
        items[0].text = "Raio e intensidade indicam \n Número de focos de incêndio"
        items[0].iconStroke = "rgb(148, 0, 0)"
        items.push({
            text: "La Niña ↓",
            iconEnabled: false,
        })
        const legenda = [
            { color: '#b45f06', text: "Muito Forte"},
            { color: '#674ea7', text: "Forte"},
            { color: '#8e7cc3', text: "Moderado"},
            { color: '#b4a7d6', text: "Fraco"},
            { color: DEFAULT_COLOR, text: "Sem Fenômenos"},
            { color: '#f9cb9c', text: "Fraco"},
            { color: '#f6b26b', text: "Moderado"},
            { color: '#e69138', text: "Forte"},
            { color: '#b45f06', text: "Muito Forte"},
        ]
        for (const item of legenda) {
            items.push({
                ...baseItem,
                iconEnabled: true,
                iconFill: item.color,
                iconSize: 20,
                iconType: "rectangle",
                text: item.text,
                iconStroke: "black"
            });
        }
        
        items.push({
            text: "El Niño ↑",
            iconEnabled: false,
        })
        return items;
    });
    map.legend(true);

    //set map container id (div)
    map.container('container');
  
    //initiate map drawing
    map.draw();
}
