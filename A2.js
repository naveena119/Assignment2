//import fetch from "node-fetch";

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


function findminmax(pList){
    let min = pList[0].price;
    let max = 0;

    pList.map((product)=>{
        if(product.price > max) max = product.price;
        else if(product.price < min) min = product.price;
    });

    let minProduct = pList.filter((e) => e.price === min);
    let maxProduct = pList.filter((e) => e.price === max);

    minProduct.map((product) => console.log("min price\nName: "+product.product+" Price:"+product.price));
    maxProduct.map((product) => console.log("max price\nName: "+product.product+" Price:"+product.price));

}

function productByBrandAndPrice(pList, brand, price = 0){
    let filterBrandProductList = pList.filter((e) => e.brand === brand );
    
    if(price > 0){
        let filterPriceProductList = filterBrandProductList.filter(
            (e) => (e.price > 0 && e.price <= price)
        );
        
        filterPriceProductList.map((product) => console.log("Name: "+product.product+" \nbrand: "+product.brand+"\nprice: "+product.price));
    } else 
        filterBrandProductList.map((product) => console.log("Name: "+product.product+" \nbrand: "+product.brand+"\nprice: "+product.price));
}

function searchname(pList,searchStr){
    let filterProductList = pList.filter((e) => (e.productName).includes(searchStr));
    filterProductList.map((product) => console.log(product.productName))
}


function makeApiCall(){
    fetch("https://demo7303877.mockable.io/",{method:"GET"})
    .then((res)=>{
        let promise = res.json();
        promise.then((result)=>{
            let pList = result.products;
            console.log("\nA");
            findminmax(pList);
            console.log("\nB");
            productByBrandAndPrice(pList,"Daniel Klein");
            console.log("\nC");
            searchname(pList,"Watch");
        })

    })
}

makeApiCall();