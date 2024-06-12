const http = require('http');
const url = require('url');

const server = http.createServer((req,res) => {

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if(pathname === '/categories/:categoryName/products') {
        const categoryName = parsedUrl.searchParams.categoryName;
        const n = parsedUrl.query.n;
        const page = parsedUrl.query.page;
        const sort = parsedUrl.query.sort;

        const companies = [
            {name: 'Company A', api:''},
            {name: 'Company B', api:''},
            {name: 'Company A', api:''},
            {name: 'Company A', api:''},
            {name: 'Company A', api:''},
        ];

        const promises = company.map(company => {
            const api = company.api;
            const params = {categoryName, priceRange:''};
            return makeApiCall(api,params);
        });

        Promise.all(promises).then(responses => {
            const products = responses.flatMap(response => response.data);

            const topNProducts = products,slice(0, n);
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.end(JSON.stringify(topNProfucts));
        }).catch(error => {
            console.error(error);
            res.writeHead(500,{'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: 'Internal Server Error'}));
        });
    }  else if (pathname === '/categories/:categoryName/products/:productId') {
        const categoryName = parsedUrl.params.categoryName;
        const productId = parsedUrl.params.productId;
    }
});