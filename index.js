const fs = require('fs');
const http = require('http');
const url = require('url');



const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const dataObj = JSON.parse(productData);

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');

const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');


const replaceTemplate = (temp, product) => {
 let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
 output = output.replace(/{%IMAGE%}/g, product.image);
 output = output.replace(/{%PRICE%}/g, product.price);
 output = output.replace(/{%FROM%}/g, product.from);
 output = output.replace(/{%NUTRIENT%}/g, product.nutrients);
 output = output.replace(/{%QUANTITY%}/g, product.quantity);
 output = output.replace(/{%DESCRIPTION%}/g, product.description);
 output = output.replace(/{%ID%}/g, product.id);


 if(!product.organic){
  output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
 }
return output;
}

//SERVER
const server = http.createServer((req, res) =>{
    console.log(req.url);
    const {query, pathname} = url.parse(req.url, true);
    const pathName = req.url;
 
 //Overview route
    if(pathname === "/" || pathname === "/overview"){

        res.writeHead(200, {'content-type':'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
        res.end(output);

// Product route
    }else if(pathname === "/product"){

        console.log(query);
        res.writeHead(200, {'content-type':'text/html'});

        const product = dataObj[query.id];

        const output = replaceTemplate(tempProduct, product);

        res.end(output);
// Api
    }else if(pathname === "/api"){
      
         res.writeHead(200, {'content-type':'application/json'});

          res.end(productData);
  // NOt found
    }else{

        res.writeHead(404, {'content-type':'text/html'});

        res.end('<h1>Page not found </h1>');
    }
});



server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})