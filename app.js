var http = require('http');
var fs   = require('fs');
require('dotenv').config();


var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]
const beatlesNames =["John%20Lennon","Paul%20McCartney","George%20Harrison","Richard%20Starkey" ]

// const handleServer = (req, res) =>{
//       let i = 0
//       for(let j=0; j<beatlesNames.length; j++){
//             if(req.url ==="/api/"+beatlesNames[j]){
//                   i = j
//               }
//          }
//          if(req.url === "/"){
//             res.writeHead(200, {'Content-type': 'text/html'})
//         		var html = fs.readFileSync(__dirname +'/index.html');
//             res.end(html)

//         } else if ( req.url === "/api") {
//           res.writeHead(200, { 'Content-type': 'application/json' })
//           //var text = fs.readFileSync(__dirname + beatles );   
//           res.end(JSON.stringify(beatles))
//       } else if( req.url === "/api/" +beatlesNames[i] ){
//         res.writeHead(200, { 'Content-type': 'application/json' })
//         res.end(JSON.stringify(beatles[i]))
//       }else{
//           res.writeHead(200, { 'Content-type': 'text/html' })
//           res.write('<p>Error, Creado por Will I am ♥</p>') 
//           res.end()
//       }
// }
const handleServer = (req, res) =>{
      let i = 0
      for(let j=0; j<beatlesNames.length; j++){
            if(req.url ==="/api/"+beatlesNames[j]){
                  i = j
              }
      }
      for(let j=0; j<beatlesNames.length; j++){
          if(req.url ==="/"+beatlesNames[j]){
                i = j
            }
       }
      switch(req.url){
        case "/":
            res.writeHead(200, {'Content-type': 'text/html'})
        		var html = fs.readFileSync(__dirname +'/index.html');
            res.end(html)
            break
        case "/api":
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(JSON.stringify(beatles))
            break
        case "/api/"+beatlesNames[i]:
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(JSON.stringify(beatles[i]))
            break
        case "/"+beatlesNames[i]:
            res.writeHead(200, { 'Content-Type':'text/html' })
            var html = fs.readFileSync(__dirname +'/beatle.html', 'utf8'); //Codificamos el buffer para que sea una String
            var nombre = beatles[i].name; //Esta es la variable con la que vamos a reemplazar el template
            var description = `Birthdate: ${beatles[i].birthdate}`;
            var img =`<img src=${beatles[i].profilePic}>`;
            html = html.replace('{name}', nombre).replace('{name_name}', nombre).replace('{birth}', description).replace('{profilePic}', img); // Usamos el método replace es del objeto String
            res.end(html);
            break
        default:
            res.writeHead(200, { 'Content-type': 'text/html' })
            // res.write('<p>Error, Creado por Will I am ♥</p>') 
            var html = fs.readFileSync(__dirname +'/nofound.html', 'utf8'); //Codificamos el buffer para que sea una String
            res.end(html)
      }
}

const martina = (req, res) =>{
  console.log('lo que viene en req.url: ',req.url)
  if(req.url === '/api'|| req.url === '/api/'){
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(JSON.stringify(beatles))
  }
  if(req.url.substring(0,5) ==='/api/' && req.url.length > 5){
    let findBeatle = req.url.split('/').pop()
    let foundBeatle = beatles.find( beatle => {
      return findBeatle === encodeURI(beatle.name)//encodeUrl me pone %20 en el nombre
    })
    if(foundBeatle){
      res.writeHead(200, {'Content-type': 'application/json'})
    res.end(JSON.stringify(foundBeatle))
    } else {
      res.writeHead(404, {'Content-type': 'text/plain'})
      res.end('El beatle no existe')
    }
  }
  if(req.url === '/'){
    res.writeHead(200, {'Content-type': 'text/html'})
    const index = fs.readFileSync(`${__dirname}/index.html`); //Codificamos el buffer para que sea una String
    res.end(index) 
  }
  let findBeatle = req.url.split('/').pop()
  let foundBeatle = beatles.find( beatle => {
    return findBeatle === encodeURI(beatle.name)//encodeUrl me pone %20 en el nombre
  })
  if(foundBeatle){
    res.writeHead(200, {'Content-type': 'text/html'})
    const b = fs.readFileSync(`${__dirname}/beatle.html`, 'utf-8')
    console.log('el betlefound es: ',b)
    let finalHTML = replaceData(b, foundBeatle);
    res.end(finalHTML);
  }else{
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.end('No existe ese Beatle');
  }
}


function replaceData(template, beatle){
  return template
      .replace('{name}', beatle.name)
      .replace('{name_name}', beatle.name)
      .replace('{birth}', beatle.birthdate)
      .replace('{profilePic}', beatle.profilePic);
}
const server = http.createServer(handleServer)
//const server = http.createServer(martina)
const port_number = process.env.PORT || 1338;
const host = '0.0.0.0';


server.listen(port_number, host,() =>{
  console.log(`Server listenning on port: ${port_number}`)
})
// server.listen(1338, '127.0.0.1')