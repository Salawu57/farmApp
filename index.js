const fs = require('fs');
const http = require('http');



 const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

 const dataObj = JSON.parse(productData);

  console.log(dataObj);
  
//SERVER
const server = http.createServer((req, res) =>{
    console.log(req.url);

    const pathName = req.url;

    if(pathName === "/" || pathName === "/overview"){

        res.end('this is the OVERVIEW');

    }else if(pathName === "/product"){

        res.end('this is the PRODUCT');

    }else if(pathName === "/api"){
      
         res.writeHead(200, {'content-type':'application/json'});

          res.end(productData);
  
    }else{

        res.writeHead(404, {'content-type':'text/html'});

        res.end('<h1>Page not found </h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000')
})