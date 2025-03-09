const http = require( 'http' );
const app = require("./app")
const port = process.env.PORT || 3000;

const server = http.createServer(app);
// to use the environmental base variable use the npm i dotenv and cors
server.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
    // after this add the packga.json the file name which is run 
})