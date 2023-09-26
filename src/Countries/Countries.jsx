// import { useEffect } from "react";
// import { useState } from "react";
// import Country from "./Counrty/Country";
// import { addToLs, getStored } from "../../public/Cart";
// // import Country from "./Counrty/Country";

// const Countries = () => {
//      const [countries, setCountries] = useState([]);
//      const [visited, setVisited]= useState([]);
//      const [flags, setFlags]= useState([]);
//      const [county, setCounty]= useState([]);
//      // console.log(county);
//      useEffect(() => {
//           fetch('https://restcountries.com/v3.1/all')
//                .then(response => response.json())
//                .then(data => setCountries(data))

//      }, [])
//      useEffect(()=>{
//           const getStoredCart= getStored();
//           // console.log(getStoredCart);
//           let save=[]
         
//           for(const id of getStoredCart){
               
//                const cnty= countries.find(cnty => cnty.cca3 === id);
//                // console.log(cnty);

//                if (cnty) {
//                     save.push(cnty);
//                   }
              
//           }
          
//           // save.map(county=>{
//           //      console.log(county);
//           // })
//           setCounty(save);
//      },[countries]);
  
//      const handleMarkVisited= country =>{
//           const visitCountry = [...visited, country];
//           setVisited(visitCountry);
//      }
//      const handleFlag = flag=>{
//           const newFlags= [...flags, flag];
//           setFlags(newFlags);
//      }
// const handleAddToCart = country =>{
// // console.log(country.cca3);
// // const newCounty = [...county, country];
// // setCounty(newCounty);
// setCounty([...county, country.cca3]);
// addToLs(country.cca3);
// }

//      return (
//           <div>
               
//                <h3 className=" font-bold text-center text-2xl">Country: {countries.length}</h3>
//                <h3 className=" font-bold text-center text-2xl">County: {county.length}</h3>
//                {/* <h3 className=" font-bold text-center text-2xl">County: {county.length}</h3> */}
//                <div className="my-3">
//                     <h3 className=" font-semibold text-center text-lg">Visited Country: {visited.length}</h3>
//                    <div className="flex flex-wrap gap-2">
//                    {
//                     flags.map(flg=><img className="w-20, h-16" key={flg} src={flg}></img>)
//                    }
                  
//                    </div>
//                    <div>

//                     {
//                       county.map(singleCnt=><li key={singleCnt?.name?.common}>{singleCnt?.name?.common}</li>)   
//                     }
//                    </div>
//                     <ul>
//                          {
//                               visited.map(countryName =><li key={visited}>{countryName}</li>)
//                          }
//                     </ul>

//                </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//               {
//                     countries.map((country) => <Country 
//                          key={country.cca3}
//                          handleMarkVisited={handleMarkVisited}
//                          handleFlag={handleFlag}
//                          handleAddToCart={handleAddToCart}
//                          country={country}
//                          ></Country>)
//                }
//               </div>

//           </div>
//      );
// };

// export default Countries;

import { useEffect, useState } from "react";
import Country from "./Counrty/Country";
import { addToLs, getStored } from "../../public/Cart";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [visited, setVisited] = useState(new Set()); // Use a Set for visited countries
  const [flags, setFlags] = useState([]);
  const [county, setCounty] = useState([]);

  useEffect(() => {
    // Fetch initial list of countries
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))

    // Retrieve cart data from local storage and update the state
    const storedCart = getStored();
    setCounty(storedCart);
  }, []);

  const handleMarkVisited = country => {
    const countryName = country.name?.common;
    const updatedVisited = new Set(visited);
    updatedVisited.add(countryName);
    setVisited(updatedVisited);
  }
  

  const handleFlag = flag => {
    const newFlags = [...flags, flag];
    setFlags(newFlags);
  }

  const handleAddToCart = country => {
    addToLs(country.cca3);
    // Update the state with the new cart data
    setCounty([...county, country.cca3]);
  }

  return (
    <div>
      <h3 className="font-bold text-center text-2xl">Country: {countries.length}</h3>
      <h3 className="font-bold text-center text-2xl">County: {county.length}</h3>
      <div className="my-3">
        <h3 className="font-semibold text-center text-lg">Visited Country: {visited.size}</h3>
        <div className="flex flex-wrap gap-2">
          {flags.map(flg => <img className="w-20 h-16" key={flg} src={flg}></img>)}
        </div>
        <div>
          {county.map(id => {
            const country = countries.find(cnty => cnty.cca3 === id);
            return <li key={country?.cca3}>{country?.name?.common}</li>;
          })}
        </div>
        <ul>
          {Array.from(visited).map(countryName => <li key={countryName}>{countryName}</li>)}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {countries.map(country => (
          <Country
            key={country.cca3}
            handleMarkVisited={handleMarkVisited}
            handleFlag={handleFlag}
            handleAddToCart={handleAddToCart}
            country={country}
          ></Country>
        ))}
      </div>
    </div>
  );
};

export default Countries;

