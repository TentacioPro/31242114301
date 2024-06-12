const http = require('http');
const https = require('https');
const url = require('url');

const server = http.createServer((req,res) => {

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    if(pathname.startsWith('test/companies/')) {
        const companyName = parsedUrl.pathname.split('/')[3];
        const categoryName = parsedUrl.pathname.split('/')[5];
        const topN = parseInt(parsedUrl.query['top-n']);
        const minPrice = parseInt(parsedUrl.query['minPrice']);
        const maxPrice = parseInt(parsedUrl.query['maxPrice']);


        if(!companyName || !categoryName || !topN || !minPrice || !maxPrice ) {
            res.writeHead(400, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({error: 'Invalid request'}));
            return;
        }

        if(!isValidCompany(companyName)|| !isValidCategory(categoryName)){
            res.writeHead(400, {'Content-Type':'application/json'});
            res.end(JSON.stringify({error : 'Invalid Company or Category'}));
            return;
        }

        const companyApi = getCompanyApi(companyName);
        const params = { categoryName, minPrice, maxPrice};
        makeApiCall(companyApi, params).then(response => {});
    }
});