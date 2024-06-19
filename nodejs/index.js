const http = require('http');
const db = require("./db");
const namesApi = require("./randomNameFetchApi");

const home = '<h1>Full Cycle Rocks!!</h1></br></br>';

const server = http.createServer(async (req, res) => {
	const url = req.url;
	switch(url.toLowerCase()) {
		case "/":
			newPersonThenReturn(res)
			break;
		case "/dockerhealthcheck":
			writeResponse('service_healthy', 200, res) 
			break;
		default:
			writeResponse('<h1>404 Not Found</h1>', 404, res)
	}
})

function writeResponse(message, status, res) {
	if( res != null ) {
		res.writeHead(status, { 'content-type': 'text/html; charset=utf-8' })
		res.write(message, 'utf-8')
		res.end()
	}
}

function newPersonThenReturn(res) {
	namesApi.randomName().then(
		randomName => {
			db.insertPerson(randomName).then(
				() => {
					peopleNamesFromDb().then(
						peopleFromDatabase => {
							writeResponse(home.concat(peopleFromDatabase), 200, res)
						}
					)
				}
			)
		}
	)
}

async function peopleNamesFromDb() {
	var peopleNames = '';
	const pessoasFromDatabase = await db.selectPeople();
	pessoasFromDatabase.forEach(
		person => {
			peopleNames = peopleNames + '<h3>' + person.nome + '</h3>'
		}
	);
	return peopleNames;
}

server.listen(process.env.PORT || 3000, () => console.log(`server running on ${server.address().port}`))