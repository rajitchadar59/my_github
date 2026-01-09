import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import HeatMap from '@uiw/react-heat-map'

//function to generate random activity

const generateActivityData = (startDate,endDate)=>{
    const data = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while(currentDate <= end ){
        const count = Math.floor(Math.random() *50);
        data.push({
            date:currentDate.toISOString().split('T')[0],
            count:count,
        })

        currentDate.setDate(currentDate.getDate()+1);
    }

    return data;
};

const getPanelColors = (maxCount)=>{
    const colors = {};

    for(let i =0 ; i <= maxCount ; i++){
       const green = Math.floor((i/maxCount)*255);
       colors[i]=`rgb(0,${green},0)`
    }

    return colors;
}



function HeatMapProfile() {
    const [activityData, setactivityData] = useState([]);
    const [panelColors, setpanelColors] = useState({});

    useEffect(()=>{
        const fetchData = async ()=>{
            const startDate ='2001-01-01';
            const endDate ='2001-01-31';
            const data = generateActivityData(startDate,endDate);
            setactivityData(data);
            
            const maxCount = Math.max(...data.map((d)=>d.count));
            setpanelColors(getPanelColors(maxCount));


        }
        fetchData();
    },[]);

    return (
    <div>
      <h4 style={{textAlign:"center"}}>Recent Contributions</h4>
      <HeatMap
       className="HeatMapProfile"
       style={{maxWidth :"700px",height:"200px",color:"white"}}
       value={activityData}
       weekLabels={["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}
       startDate={new Date('2001-01-01')}
       rectSize={15}
       space={3}
       reactProps={{
        rx:2.5,

       }}
       
       panelColors={panelColors}

      />

    </div>
  )
}

export default HeatMapProfile;
