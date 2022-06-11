$('.search-button').on('click', function () {

    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=21cf67eb&s=' + $('.input-keyword').val(),
        success: result => {
            const movies = result.Search;
            console.log(movies);
            let cards = '';
            movies.forEach(m => {
                cards += showCards(m);
            });
            $('.movies-container').html(cards);

            // ketika tombol detail diklik
            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=21cf67eb&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = showMovieDetail(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                });
            });

        },
        error: (e) => {
            console.log(e.responseText);
        }
    });

});



function showCards(m) {
    return `<div class="col-md-4 my-5">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-warning modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h4>${m.Title}(${m.Year})</h4>
                            </li>
                            <li class="list-group-item"><strong>Director :</strong> ${m.Director} </li>
                            <li class="list-group-item"><strong>Actor :</strong>${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer :</strong>${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot :</strong>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}

// menggunakan JQuery
// $.ajax({
//     url: 'http://www.omdbapi.com/?apikey=21cf67eb&s=avatar',
//     success: movies => console.log(movies)
// })

// menggunakan vanilla javascript
// const xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//     if (xhr.status === 200) {
//         if (xhr.readyState === 4) {
//             console.log(JSON.parse(xhr.response));
//         }
//     } else {
//         console.log(xhr.responseText);
//     }
// }
// xhr.open('get', 'http://www.omdbapi.com/?apikey=21cf67eb&s=avatar')
// xhr.send();  

// fetch('http://www.omdbapi.com/?apikey=21cf67eb&s=avatar')
//     .then(response => response.json())
//     .then(response => console.log(response));

// Promies
// Obj yang merepresentasikan keberhasilan atau kegagalan sebuah event yang asynchronous dimasa yang akan datang
// janji (terpenuhi/ingkar)
// state (fulfilled/rejected/pending)
// callback (resolve/reject/finally)
// aksi (then/catch)

// Contoh 1
// let ditepati = true;
// const janji1 = new Promise((resolve, reject) => {
//     if (ditepati) {
//         resolve('Janji Telah Ditepati');
//     } else {
//         reject('Ingkar Janji ...');
//     }
// });

// janji1
//     .then(response => console.log('OK! : ' + response))
//     .catch(response => console.log('NOT OK! : ' + response));

// Contoh 2
// let ditepati = true;
// const janji2 = new Promise((resolve, reject) => {
//     if (ditepati) {
//         setTimeout(() => {
//             resolve('Ditepati setelah beberapa waktu!')
//         }, 2000);
//     } else {
//         setTimeout(() => {
//             resolve('Tidak ditepati setelah beberapa waktu!')
//         }, 2000);
//     }
// });

// console.log('mulai');
// janji2
//     .finally(() => console.log('selesai menunggu'))
//     .then(response => console.log('OK! : ' + response))
//     .catch(response => console.log('NOT OK! : ' + response));
// console.log(janji2
//     .then(() => {
//         console.log(janji2);
//     }));
// console.log('selesai');

// Contoh 3

// const film = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([{
//             judul: 'Adikmu Adalah Istriku',
//             sutradara: 'Manoj Pundjabi',
//             pemeran: 'Reza Sahadian, Cinta Lautan'
//         }]);
//     }, 1000);
// });

// const cuaca = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([{
//             kota: 'Tangerang Selatan',
//             temp: 21,
//             kondisi: 'Gerimis Kecil '
//         }]);
//     }, 2000);
// });

// film.then(response => console.log(response));
// cuaca.then(response => console.log(response));

// menggunakan promise.all
// Promise.all([film, cuaca])
//     // .then(response => console.log(response));
//     .then(response => {
//         const [film, cuaca] = response;
//         console.log(film);
//         console.log(cuaca);
//     })