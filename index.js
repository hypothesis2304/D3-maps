var map = new Datamap({

            element: document.getElementById('container'),
            scope: 'ind',
            data: data,
                     
            geographyConfig: {
                borderColor: '#111',
                borderWidth: 0.5,
                popupTemplate: function(geography, data) { 
                    return '<div class="hoverinfo"><strong>' + data.TOTPOPULAT + '</strong></div>';
                }
            },

            fills:
            {
                "abc" : "#e5d0ae",
                "bcd" : "#d6b889",
                "cde" : "#d1ac73",
                "def" : "#c69549",
                "efg" : "#c48523",
                "fgh" : "#e08e0f",
                "ghi" : "#f29402",
                defaultFill: "#e5d0ae"
            },

            done: function(datamap){
                d3.selectAll('.datamaps-subunit').on('click', function(data){
                    barChart(data.id);
                })
            },

            setProjection: function(element) {
                var projection = d3.geo.equirectangular()
                    .center([80, 10])

                    .scale(1100)
                    .translate([300, element.offsetHeight / 2]);
            var path = d3.geo.path()
                .projection(projection);
        return { path: path, projection: projection };
        }

});

function barChart(id){
    $("#barChart").empty()
    $("#barChart").append("<p><b> Bar chart1 represents the female literacy rate: " + data[id]["FEMALE_LIT"] + "</b></p>")
    $("#barChart").append("<p><b> Bar chart2 represents the male literacy rate: " + data[id]["MALE_LIT"] + "</b></p>")
    
    var female_lit = []
    var male_lit = []
    var vals_ = Object.values(data)
    var keys_ = Object.keys(data)
    
    var mini  = 2000
    var maxi =-1

    var minimum = 2000
    var maximum = -1

    for (let val in vals_){
        female_lit.push(vals_[val].FEMALE_LIT)
        if(minimum > vals_[val].FEMALE_LIT) {
            minimum = vals_[val].FEMALE_LIT
        } 
        if(maximum < vals_[val].FEMALE_LIT) {
            maximum = vals_[val].FEMALE_LIT
        } 

    }

    for (let val in vals_){
        male_lit.push(vals_[val].MALE_LIT)
        if(mini > vals_[val].MALE_LIT) {
            mini = vals_[val].MALE_LIT
        } 
        if(maxi < vals_[val].MALE_LIT) {
            maxi = vals_[val].MALE_LIT
        } 

    }

    var groupdata = keys_.map(function(e, i){
        return [e, vals_[i]]
    })


    var margin = 60;
    var width = 400 - 2 * margin;
    var height = 350 - 2 * margin;
    var svg = d3.select('svg1');
    var svg = d3.select('svg');
    var padding = 0.1

    var newMarginX = 950
    var newMarginY = 40
// for bar chart 2 //////////////////////////////////////

    var newMarginX1 = 950
    var newMarginY1 = 340
// ////////////////////////////////////////////
    var chart = svg.append('g')
        .attr('transform', `translate(${newMarginX}, ${newMarginY})`);

    var yScale = d3.scale.linear()
        .range([height, 0])
        .domain([30, 100]);

    var yAxis = d3.svg.axis().scale(yScale).orient("left")    

    chart.append('g')
        .call(yAxis);

    var xScale = d3.scale.ordinal()
        .range([padding, width - padding * 2])
            
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom")

    var barWidth = (width/keys_.length)-1; 

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    var bar =chart.selectAll()
            .data(groupdata) 
            .enter()
            .append('rect')
            // .attr('x', function(d){
            //     return d[0]
            // })
            .attr('y', function(d){
                return yScale(d[1].FEMALE_LIT)
            }) 
            .attr('height', function(d){
                return height - yScale(d[1].FEMALE_LIT)
            })
            .attr("fill", function(d){
                if(d[0] == id){
                    return "pink";
                }
                else{
                    return "steelblue";
                }
            })
            .attr('width', barWidth - 1)
            .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });


    var chart1 = svg.append('g')
        .attr('transform', `translate(${newMarginX1}, ${newMarginY1})`);

    var yScale1 = d3.scale.linear()
        .range([height, 0])
        .domain([30, 100]);

    var yAxis1 = d3.svg.axis().scale(yScale1).orient("left")    

    chart.append('g')
        .call(yAxis1);

    var xScale1 = d3.scale.ordinal()
        .range([padding, width - padding * 2])
            
    var xAxis1 = d3.svg.axis().scale(xScale1).orient("bottom")

    var barWidth = (width/keys_.length)-1; 

    chart1.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis1);

    var bar1 =chart.selectAll()
            .data(groupdata) 
            .enter()
            .append('rect')
            // .attr('x', function(d){
            //     return d[0]
            // })
            .attr('y', function(d){
                return yScale(d[1].MALE_LIT)
            }) 
            .attr('height', function(d){
                return height - yScale(d[1].MALE_LIT)
            })
            .attr("fill", function(d){
                if(d[0] == id){
                    return "pink";
                }
                else{
                    return "teal";
                }
            })
            .attr('width', barWidth - 1)
            .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",300)"; });

} 



