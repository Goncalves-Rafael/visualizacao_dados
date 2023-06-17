// CONFIGURAR CORES DOS FENOMENOS
const COLORS_FENOMENOS = {
    'El Nino': {
        'Very Strong': '#9d5716',
        'Weak': '#ffe3c8',
        'Moderate': '#ffc691',
        'Strong': '#e06f1f'
    },
    'La Nina': {
        'Very Strong': '#8674aa',
        'Weak': '#f1ebff',
        'Moderate': '#e4d6ff',
        'Strong': '#cda5f3'
    },
}

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
    return parseInt((number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin)
}

function getStatesDataSets() {
    const fenomenoAtual = fenomenoAno[selectedYear]
    const currentColor = COLORS_FENOMENOS[fenomenoAtual.phenomenon][fenomenoAtual.severity]
    return anychart.data.set(
        [
            {"id":"BR.AC","value":3, "fill": currentColor},
            {"id":"BR.AM","value":4, "fill": currentColor},
            {"id":"BR.MA","value":5, "fill": currentColor},
            {"id":"BR.PA","value":6, "fill": currentColor},
            {"id":"BR.RO","value":7, "fill": currentColor},
            {"id":"BR.TO","value":8, "fill": currentColor},
            {"id":"BR.MT","value":12, "fill": currentColor},
            {"id":"BR.RR","value":25, "fill": currentColor},
            {"id":"BR.AP","value":26, "fill": currentColor}
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
  
    fireSpotsDataset = anychart.data.set(fireSpots).mapAs();
    let min = 1
    let max = 580
    mapSeries = map.marker(fireSpotsDataset.filter('year', filterByYear));
    mapSeries
        .name('Focos de Incêndio')
        .fill((el) => {
            if (el.index >= 0) {
                const { firespots } = el.iterator.f
                return `rgb(${scale(firespots, min, max, 140, 255)}, 0, 0)`
            }
            return 'red'
        })
        .stroke((el) => {
            if (el.index >= 0) {
                const { firespots } = el.iterator.f
                return `rgb(${scale(firespots, min, max, 140, 255)}, 0, 0)`
            }
            return 'red'
        })
        .type('circle')
        .size(4)
        .labels(false)
        .selectionMode('none');

    mapSeries.hovered().stroke('2 #fff').size(8);

    mapSeries
        .legendItem()
        .iconType('circle')
        .iconFill('Red')
        .iconStroke('2 #E1E1E1');

  
    //set map container id (div)
    map.container('container');
  
    //initiate map drawing
    map.draw();
  };