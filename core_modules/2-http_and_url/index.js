const http = require("http");

const port = 3000;
const server = http.createServer((req, res) => {
    const urlInfo = require('url').parse(req.url, true);
    const nameParam = urlInfo.query.name;

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html")
    
    if(nameParam) res.end(`<h1>Olá ${nameParam}!</h1>`)
    else res.end("<h1>Não recebi nenhum parâmetro :(</h1>")
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})