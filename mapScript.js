function filterByState(val) {
    return selectedState == null || val == selectedState
}

function filterByYear(val) {
    return selectedYear == null || val == selectedYear
}

function updateMapData() {
    mapSeries.data(fireSpotsDataset.filter('state', filterByState).filter('year', filterByYear))
}

function scale (number, inMin, inMax, outMin, outMax) {
    return parseInt((number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin)
}

function loadMap() {
    // create map
    var map = anychart.map();
    // set geo data, you can find this map in our geo maps collection
    // https://cdn.anychart.com/#maps-collection
    map.geoData(anychart.maps['brazil']);
   
    // create data set
    var dataSet = anychart.data.set(
        [
            {"id":"BR.AC","value":3},
            {"id":"BR.AM","value":4},
            {"id":"BR.MA","value":5},
            {"id":"BR.PA","value":6},
            {"id":"BR.RO","value":7},
            {"id":"BR.TO","value":8},
            {"id":"BR.MT","value":12},
            {"id":"BR.RR","value":25},
            {"id":"BR.AP","value":26}
        ]
    );

    map.unboundRegions().fill('#eee');
    map.title().useHtml(true).hAlign('center');
    map.title('<span style="font-size: 18px;">Mapa de Focos de Incêndio</span><br><span style="font-size:12px;">Mova o mouse para ver as ocorrências em cada estado</span>');

    var series = map.choropleth(dataSet);
    series.labels().fontColor('black');
  
    // create choropleth series
    // series = map.choropleth(dataSet);
  
    // // set geoIdField to 'id', this field contains in geo data meta properties
    // series.geoIdField('id');
  
    // // set map color settings
    // series.colorScale(anychart.scales.linearColor('#deebf7', '#3182bd'));
    // series.hovered().fill('#addd8e');

    // creates Dataset from Sample data
    fireSpotsDataset = anychart.data.set(fireSpots).mapAs();
    let color = 'red'
    let name = 'teste'
    let min = 1
    let max = 580
    mapSeries = map.marker(fireSpotsDataset.filter('year', filterByYear));
    mapSeries
        .name(name)
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
        .iconFill(color)
        .iconStroke('2 #E1E1E1');

  
    //set map container id (div)
    map.container('container');
  
    //initiate map drawing
    map.draw();
  };