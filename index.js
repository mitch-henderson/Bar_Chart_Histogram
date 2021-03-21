const svg = d3.select("svg")
.attr("width", 500)
.attr("height", 500)
d3.csv("Data_Managing_Crisis_Wave_5_CLEAN.csv").then((data)=>{
    const q157data = data.map((d)=>{return Number(d.Q157);})
    console.log(q157data)
    const countArray = [0,0,0,0,0,0,0]
    q157data.forEach((d)=>{
        if (d<4){
            countArray[0]+=1         
        } else if (d<7){
            countArray[1]+=1
        } else if (d<10){
            countArray[2]+=1
        } else if (d<13){
            countArray[3]+=1
        } else if (d<16){
            countArray[4]+=1
        } else if (d<19){
            countArray[5]+=1
        }else {
            countArray[6]+=1
        }
    })
    console.log(countArray)
})