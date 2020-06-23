
const servers={
   devServer:process.env.BACKEND || 'http://localhost:4000', //https://vcointransfer.herokuapp.com
   staticServer:process.env.STATIC || 'http://localhost:4000/static' //https://vcointransfer.herokuapp.com/static
}

export {servers}

/* Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET,PUT,POST,DELETE"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"  */