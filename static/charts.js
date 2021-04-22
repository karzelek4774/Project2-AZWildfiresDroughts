


function initialChart(year,county){
  d3.json("/api/v1.0/az_wildfires").then((fireData)=> {


  
  
    // console.log(fireData);
    // console.log(year)

    var yearFilter=fireData.filter(obj=>obj.FIRE_YEAR==year)

         console.log(year)
    countsYear={}


    yearFilter.forEach((year)=>{

      if(year["STAT_CAUSE_DESCR"] in countsYear)


        countsYear[year["STAT_CAUSE_DESCR"]]+=1


      else

        countsYear[year["STAT_CAUSE_DESCR"]]=0


       


      // console.log(counts)

    })


    causes=Object.keys(countsYear)
    causesCounts=Object.values(countsYear)
    console.log(causes)
    console.log(causesCounts)

    var data = [{
      values: causesCounts,
      labels: causes,
      type: 'pie',
      name:'Cause of Wildfires'
    }];
    
    var layout = {
      height: 400,
      width: 500
    };
    
    Plotly.newPlot('chart1', data, layout);



    var countyFilter=fireData.filter(obj=>obj.FIRE_YEAR==year && obj.COUNTY==county)

    console.log(countyFilter)
    countsYearCounty={}


      countyFilter.forEach((cy)=>{

      if(cy["STAT_CAUSE_DESCR"] in countsYearCounty)


     countsYearCounty[cy["STAT_CAUSE_DESCR"]]+=1


      else

     countsYearCounty[cy["STAT_CAUSE_DESCR"]]=0


  


     // console.log(counts)

    })


    causes=Object.keys(countsYearCounty)
    causesCounts=Object.values(countsYearCounty)
    console.log(causes)
    console.log(causesCounts)

    var data = [{
    values: causesCounts,
    labels: causes,
    type: 'pie',
    name:'Cause of Wildfires'
    }];

    var layout = {
    height: 400,
    width: 500
    };

    Plotly.newPlot('chart3', data, layout);





   

 

    countyCounter={}
    var countyData=fireData.map(county=>county.COUNTY)


    console.log(countyData)

    countyData.forEach(name=>{

    

    if(name in countyCounter)


      countyCounter[name]+=1


    else

      countyCounter[name]=0

    })

    console.log(countyCounter)

    var countyBar=Object.entries(countyCounter)

    var countyBar=countyBar.sort((a,b)=>b[1]-a[1])

    console.log(countyBar)



    // var countyNames=Object.keys(countyCounter)


    // var countyValues=Object.values(countyCounter)

    var countyNames=countyBar.map(p=>p[0])
    var countyValues=countyBar.map(p=>p[1])

    console.log(countyNames)
    console.log(countyValues)

    var data = [
    {
      x: countyNames,
      y: countyValues,
      type: 'bar',
      name:"Wildwire by County from 2005 to 2015"
    }
    ];
  
    Plotly.newPlot('chart', data);



   sizeCounter={}
   var sizeData=fireData.map(size=>size.FIRE_SIZE_CLASS)


    // console.log(sizeData)

   sizeData.forEach(siz=>{

    

    if(siz in sizeCounter)


      sizeCounter[siz]+=1


    else

        sizeCounter[siz]=0


   })

   console.log(sizeCounter)


   var sizeGrade=Object.keys(sizeCounter)


   var sizeValues=Object.values(sizeCounter)


   console.log(sizeGrade)
   console.log(sizeValues)


   var trace1 = {
    x: sizeGrade,
    y: sizeValues,
    text: sizeGrade,
    mode: 'markers',
    marker: {
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
      size:sizeValues.map(o=>o/50)
    }
    };
  
    var data = [trace1];
  
    var layout = {
    title: 'Wildfire by size A-G from 2005-2015',
    showlegend: false,
    height: 600,
    width: 600
    };
  
    Plotly.newPlot('chart2', data, layout);
  })
      
}

// d3.json("/api/v1.0/az_droughts").then(data=>{


//   console.log(data)








// })
// var dropdown=d3.select("#selectYear");

//   yearsArray.forEach(ye=>{

//   console.log(ye)

//   dropdown.append("option").text(ye).property("value",ye);

//   // var year=y;

//   // console.log(year)\
  

//  })
 
// var dropdown=d3.select("#selectCountyLine");
//  countyName.forEach(co=>{
// //  console.log(c)
//  dropdown.append("option").text(co).property("value",co);


//  })












var yearsArray=["2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015"]

var countyName=["Coconino","Mohave","Maricopa","Yavapai","Gila","Apache","Cochise","Navajo","Greenlee","Pima","Santa Cruz","Graham","Pinal","Yuma","La Paz"]





var dropdown=d3.select("#selectDataset");

  yearsArray.forEach(y=>{

  console.log(y)

  dropdown.append("option").text(y).property("value",y);

  // var year=y;

  // console.log(year)\
  

 })
 
var dropdown=d3.select("#selectCounty");
 countyName.forEach(c=>{
//  console.log(c)
 dropdown.append("option").text(c).property("value",c);


 })

function optionChanged(selectedYear,selectedCounty){

  

  selectedYear=d3.select("#selectDataset option:checked").text()
  // console.log(selectedYear)
  selectedCounty=d3.select("#selectCounty option:checked").text()
  // console.log(selectedCounty)



  initialChart(selectedYear,selectedCounty)


}
  

initialChart(2005,"Coconino")
