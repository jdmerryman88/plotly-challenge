function defaultValue() {
    var selector = d3.selectAll('#selDataset');

    d3.json('samples.json').then((data) => {

        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        var defaultID = sampleNames[0];

        barChart(defaultID);
        bubbleChart(defaultID);
        metaData(defaultID);
        gaugeChart(defaultID)
    })
};

function optionChanged(newID) {
    barChart(newID);
    bubbleChart(newID);
    metaData(newID);
};


defaultValue();


function barChart(subjectID) {

    d3.json('samples.json').then((data) => {
        var samples = data.samples;
        var ID = samples.map(row => row.id).indexOf(subjectID);
        var otuValue = samples.map(row => row.sample_values);
        var otuValueTen = otuValue[ID].slice(0, 10).reverse();
        var otuID = samples.map(row => row.otu_ids);
        var otuIDTen = otuID[ID].slice(0, 10);
        var otuLabel = samples.map(row => row.otu_labels).slice(0, 10);
        //console.log(subjectID)
        //console.log(ID)
        console.log(otuLabel)

        let trace1 = {
            x: otuValueTen,
            y: otuIDTen.map(r => `UTO ${r}`),
            text: otuLabel,
            type: 'bar',
            orientation: 'h'

        }
        var layout = { title: "OTUs Found", margin: { t: 30, l: 150 } };
        Plotly.newPlot('bar', [trace1], layout);
    })
};

function bubbleChart(subjectID) {

    d3.json('samples.json').then((data) => {
        var samples = data.samples;
        var ID = samples.map(row => row.id).indexOf(subjectID);
        var otuID = samples.map(row => row.otu_ids);
        var otuIDs = otuID[ID];
        var otuValue = samples.map(row => row.sample_values);
        var otuValues = otuValue[ID];
        var otuLabel = samples.map(row => row.otu_labels);
        var otuLabels = otuLabel[ID];

        let trace2 = {
            x: otuIDs,
            y: otuValues,
            text: otuLabels,
            mode: 'markers',
            marker: { size: otuValues, color: otuIDs }
        };
        var layout = { xaxis: { title: 'OTU ID' } };

        Plotly.newPlot('bubble', [trace2], layout);

    })
}

function metaData(subjectID) {

    d3.json('samples.json').then((data) => {
        var metadata = data.metadata;
        var searchData = metadata.filter(item => item.id == subjectID);
        var outputData = searchData[0];
        //console.log(outputData)

        //select panel
        var panel = d3.select("#sample-metadata");
        //clear panel
        panel.html("")

        Object.entries(outputData).forEach(([key, value]) => {

            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);

        })

    })
}



