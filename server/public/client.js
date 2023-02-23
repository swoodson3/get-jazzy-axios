console.log('script sourced');

function getArtists() {
    // Axios GET request
    axios.get('/artist').then((response) => {
        // Code that will run on successful response
        // from the server.
        console.log(response);
        // quotesFromServer will be an Array of quotes
        let quotesFromServer = response.data;
        let contentDiv = document.querySelector('#artistTableBody');
        for(let artist of quotesFromServer) {
            contentDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
        }
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong.');
    }); // ALWAYS add .catch
}
// TODO Add ajax request for /songs and display on DOM
getArtists();

function getSongs() {
    axios.get('/song').then((response) => {
        console.log(response)
        let songsFromServer = response.data
        let contentTable = document.querySelector('#songTableBody')
        contentTable.innerHTML = '';
        for (let song of songsFromServer) {
            contentTable.innerHTML += `
            <tr> 
                <td>${song.title}</td>
                <td>${song.artist}</td>
            </tr>    
                `
        }
    }).catch((error) => {
        console.log('wrong')
        alert('Something went wrong')
    })
};

getSongs();

function addSongs(event) {
    event.preventDefault();
    console.log('submit is working')
    let titleAdd = document.querySelector('#songInput').value;
    let songAdd = document.querySelector('#artistInput').value;
    console.log('Inputs are', titleAdd, songAdd);
    let songForServer = {
        title: titleAdd,
        artist: songAdd,
    };
    console.log(songForServer)


axios.post('/song', songForServer).then((response) => {
    console.log(response);
    getSongs();
}).catch((error) => {
    console.log(error);
    alert('Something went wrong')
});
}