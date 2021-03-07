let url = "samples.json"

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

function barChart(subjectID){

    d3.json('samples.json').then((data) =>{
        var samples = data.samples;
        var ID = samples.map(row => row.id).indexOf(subjectID);
        var otuValue = samples.map(row =>row.sample_values);
        var otuValueTen = otuValue[ID].slice(0,10).reverse();
        var otuID = samples.map(row => row.otu_ids);
        var otuIDTen = otuID[ID].slice(0,10);
        var otuLabel = samples.map(row => row.otu_labels).slice(0,10);
        console.log(subjectID)
        console.log(ID)
        console.log(otuLabel)

        let trace1 = {
            x: otuValueTen,
            y: otuIDTen.map(r => `UTO ${r}`),
            text: otuLabel,
            type: 'bar',
            orientation: 'h'

        }
        var layout = {title: "OTUs Found", margin: { t: 30, l: 150 }};
        Plotly.newPlot('bar', [trace1], layout);
    })
};

function bubbleChart(subjectID){

    d3.json('samples.json').then((data) =>{
        var samples = data.samples;
        var ID = samples.map( row => row.id).indexOf(subjectID);
        var otuID = samples.map(row => row.otu_ids);
        var otuIDs = otuID[ID];
        var otuValue = samples.map(row =>row.sample_values);
        var otuValues = otuValue[ID];
        var otuLabel = samples.map(row => row.otu_labels);
        var otuLabels = otuLabel[ID];

        let trace2 = {
            x: otuIDs,
            y: otuValues,
            text: otuLabels,
            mode: 'markers',
            marker : { size: otuValues, color: otuIDs}
        };
        var layout = {xaxis: {title: 'OTU ID'}};

        Plotly.newPlot('bubble', [trace2], layout);

        })
}

bubbleChart()

