
const servers={
   devServer:process.env.NODE_ENV === 'production'? 'https://vcointransfer.herokuapp.com':'http://localhost:4000', 
   staticServer:process.env.NODE_ENV === 'production'? 'https://vcointransfer.herokuapp.com/static/':'http://localhost:4000/static'
}
console.log(process.env.BACKEND)
export {servers}

/* Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET,PUT,POST,DELETE"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"  */