const getStored= ()=>{
     const storedCartString = localStorage.getItem('cart')
if(storedCartString){
     return JSON.parse(storedCartString)
}
  return [];   
}
const saveCartToLs= cart=>{
     const cartString= JSON.stringify(cart);
     localStorage.setItem('cart', cartString);
}
const addToLs = id =>{
     const cart = getStored();
     cart.push(id);
     saveCartToLs(cart);
     
}

export {getStored, saveCartToLs, addToLs}