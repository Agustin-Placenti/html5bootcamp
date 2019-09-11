var jokeUrl = 'http://api.icndb.com/jokes/random';
var repoUrl = 'https://api.github.com/search/repositories';

function loadedPage() {
    if (!document.getElementById('right-side-list').hasChildNodes()) {
        document.getElementById('right-side-list').className = 'hidden';
    }
}

function createTable() {
    const playersTable = document.createElement('table');
    playersTable.className = 'players-table';
    const titleText = document.createTextNode('players');
    const title = document.createElement('div');
    title.className = 'players-table-title';
    title.appendChild(titleText);

    for ( let club in data ) {
        let tr = document.createElement('tr');

        for (let player in data[club]) {
            let playerName = data[club][player];
            let textNode = document.createTextNode(playerName);
            let th = document.createElement('th');
            th.className = 'players-table-players';
            th.appendChild(textNode);
            tr.appendChild(th)
        }
        playersTable.appendChild(tr);
    }
    document.body.appendChild(title);
    document.body.appendChild(playersTable);
}

function gotoIndex() {
    window.location.reload();
}

function displayAlert(message) {
    alert(message);
}

function getText() {
    return document.getElementById('inputAlert').value;
}

function getResponse(url, config) {
    return new Promise(function(resolve, reject){
        fetch(url, config)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                resolve(response);
                return response;
            })
            .catch(function(error){
                reject(error);
                return error;
            });
    })    
}

function updateJokeSection () {
    const promise = getResponse(jokeUrl);
        promise.then(function(response) {
            document.getElementById('jokeContent').innerHTML = response.value.joke;
        })
        promise.catch(function(error) {
            document.getElementById('jokeContent').innerHTML = error.message;
            document.getElementById('jokeContent').className = 'error-content';
        })
}

function getItems(response) {
    response.map (item => {
        return "<li>" + item + "</li>"
    });
}

function updateRepoList() {
    const promise = getResponse(repoUrl, {q: 'javascript'});
    promise.then(function(response) {
        document.getElementById('right-side-list').innerHTML = getItems(response);
    })
}

