export const getProducts = async()=>{
    const options = {
        headers: {
          Authorization: `Bearer${process.env.STRAPI_API_TOKEN}`
        }
      }

    const res = await fetch("https://amazont-ecommerce.onrender.com/api/products?populate=*",options)
    if(!res.ok){
        throw new Error ("Failed to fetch products");
    }
    return res.json();
};

export const getPhones = async()=>{
    const options = {
        headers: {
          Authorization: `Bearer${process.env.STRAPI_API_TOKEN}`
        }
      }

    const res = await fetch("https://amazont-ecommerce.onrender.com/api/categories/1?populate[products][populate]=*",options)
    if(!res.ok){
        throw new Error ("Failed to fetch products");
    }
    return res.json();
};

export const getPhonecases = async()=>{
    const options = {
        headers: {
          Authorization: `Bearer${process.env.STRAPI_API_TOKEN}`
        }
      }

    const res = await fetch("https://amazont-ecommerce.onrender.com/api/categories/2?populate[products][populate]=*",options)
    if(!res.ok){
        throw new Error ("Failed to fetch products");
    }
    return res.json();
};

export const getWatches = async()=>{
    const options = {
        headers: {
          Authorization: `Bearer${process.env.STRAPI_API_TOKEN}`
        }
      }

    const res = await fetch("https://amazont-ecommerce.onrender.com/api/categories/3?populate[products][populate]=*",options)
    if(!res.ok){
        throw new Error ("Failed to fetch products");
    }
    return res.json();
};

export const getAccessories = async()=>{
    const options = {
        headers: {
          Authorization: `Bearer${process.env.STRAPI_API_TOKEN}`
        }
      }

    const res = await fetch("https://amazont-ecommerce.onrender.com/api/categories/4?populate[products][populate]=*",options)
    if(!res.ok){
        throw new Error ("Failed to fetch products");
    }
    return res.json();
};

//Calculate Percentage

export const calculatePercentage = (previousPrice:any,price:any)=>{
  return !!parseFloat(price) && !! parseFloat(previousPrice) ? (100 - (previousPrice / price)*100).toFixed(0) : 0;
}