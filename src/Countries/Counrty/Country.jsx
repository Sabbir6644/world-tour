import { useState } from "react";

const Country = ({country, handleMarkVisited, handleFlag, handleAddToCart}) => {
     const {name,flags, area, capital}=country;
     const [Visit, setVisit]=useState(false)
     const handleVisit = ()=>{
          setVisit(!Visit);
     }
     return (
          <div className={`border text-center w-full py-4 mb-3 ${Visit && 'blue'}`}>
              <h3 className="font-semibold text-lg">Name: {name?.common}</h3>
              <p>Capital: {capital}</p>
              <p>Area: {area}</p>
              <div className="flex justify-center"><img className="w-24 h-16 py-3" src={flags?.png} alt="" /></div>
              <button onClick={handleVisit} className="btn btn-primary">Visit</button>
              {Visit && 'I have visited'}
              <button onClick={()=>handleMarkVisited(country)} className="btn btn-primary">Mark as Visited</button>
              <button onClick={()=>handleFlag(flags?.png)} className="btn btn-primary">Mark Flag</button>
              <button onClick={()=>handleAddToCart(country)} className="btn btn-primary">Add To Cart</button>
          
          </div>
          
     );
};

export default Country;