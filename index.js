
const svgHeight = 500
const svgWidth = 800
const margins = {top:30, bottom:50, left:50, right:30}
const plotHeight = svgHeight - margins.top - margins.bottom
const plotWidth = svgWidth - margins.left - margins.right

const svg = d3.select("svg")
.attr("width", svgWidth)
.attr("height", svgHeight)
Promise.all([
    d3.csv("Data_Managing_Crisis_Wave_4_CLEAN.csv"),
    d3.csv("Data_Managing_Crisis_Wave_5_CLEAN.csv")
    ]).then((dataSets)=>{
    const data = dataSets[1]
    const q157data = data.map((d)=>{return Number(d.Q157);})
    console.log(q157data)
    const countArray = [{count:0,key:"<=3 months"},{count:0,key:"4-6 months"},{count:0,key:"7-9 months"},{count:0,key:"10-12 months"},{count:0,key:"13-15 months"},{count:0,key:"16-18 months"},{count:0,key:">= 18 months"}]
    q157data.forEach((d)=>{
        if (d<4){
            countArray[0].count+=1         
        } else if (d<7){
            countArray[1].count+=1
        } else if (d<10){
            countArray[2].count+=1
        } else if (d<13){
            countArray[3].count+=1
        } else if (d<16){
            countArray[4].count+=1
        } else if (d<19){
            countArray[5].count+=1
        }else {
            countArray[6].count+=1
        }
    })
    const percentageArray = countArray.map((d)=>{
        
        return {       
            percentage:(d.count / q157data.length) * 100,
            key:d.key
        }
    })
    
    const xScale = d3.scaleBand()
    .domain(percentageArray.map((d)=>{return d.key}))
    .range([0,svgWidth - margins.right - margins.left])
    const yScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,svgHeight - margins.top - margins.bottom])
    svg.append("g")
    .call(d3.axisBottom().scale(xScale))
    .attr("transform",`translate(${margins.left},${margins.top+plotHeight})`)


    svg.append("g")
    .call(d3.axisLeft().scale(yScale))
    .attr("transform",`translate(${margins.left},${margins.top})`)

    console.log(percentageArray)
    svg.selectAll("rect")
    .data(percentageArray)
    .enter()
    .append("rect")
    .attr("x",(d)=>{return margins.left+xScale(d.key)})
    .attr("y",(d)=>{return margins.top+plotHeight-yScale(d.percentage)})
    .attr("width",50)
    .attr("height",(d)=>{return yScale(d.percentage)})
})