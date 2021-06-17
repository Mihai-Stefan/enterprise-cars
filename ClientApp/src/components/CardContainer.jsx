import React, { useState, useEffect } from "react";
import CardContent from "./CardContent";
import "../App.css";
import CarMarket from "./CarMarket";


function CardContainer({ string, data, userPoints, sortValue, reversed }) {

  const [selectedMakers,setSelectedMakers] = useState();
  
  let carItems= data;
  
  if(sortValue&&carItems)
  {console.log(reversed);
    
    carItems.sort(GetSortOrder(sortValue,reversed));}
  
  console.log(selectedMakers)
  function GetSortOrder(prop,reversed) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {
          if(reversed===true)    
            {return -1; } 
          else{return 1;}    
        } else if (a[prop] < b[prop]) {    
          if(reversed===true)    
          {return 1; } 
          else{return -1;}     
        }    
        return 0;    
    }    
}  

  return (
    <div className="card-container">
      {carItems  && carItems.map((object , index ) => 
      
      string != "" ?
      (object.company.includes(string.toLowerCase())
      || object.fuel.includes(string.toLowerCase())
      || object.bodyType.includes(string.toLowerCase())
      || object.generation.includes(string.toUpperCase())
      || object.model.includes(string.toLowerCase())
      
      )
      
      ?
      ( 
        <div className="car-card" key={index}>
        <CardContent key={index} id={index} element={object} afforted={object.valuePoints<userPoints}/>
        </div>  
      )
      :
      null
      :(
      <div className="car-card" key={index}> 
      <CardContent key={index} id={index} element={object} afforted={object.valuePoints<userPoints}/>
      </div>   
      )
      
      )}
    </div>
  );
}

export default CardContainer;
