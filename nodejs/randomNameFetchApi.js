async function randomName(){
    return nodeFetch();
}

async function nodeFetch() {
    const response = await fetch(apiUrl());
    const responseJson = await response.json();
    return responseJson.results[0].name.first + ' ' +
    responseJson.results[0].name.last;
}

function apiUrl() {
    return 'https://randomuser.me/api/';
}

module.exports = {randomName}