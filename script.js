// $('.search-button').on('click', function () {

//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=21cf67eb&s=' + $('.input-keyword').val(),
//         success: result => {
//             const movies = result.Search;
//             console.log(movies);
//             let cards = '';
//             movies.forEach(m => {
//                 cards += showCards(m);
//             });
//             $('.movies-container').html(cards);

//             // ketika tombol detail diklik
//             $('.modal-detail-button').on('click', function () {
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=21cf67eb&i=' + $(this).data('imdbid'),
//                     success: m => {
//                         const movieDetail = showMovieDetail(m);
//                         $('.modal-body').html(movieDetail);
//                     },
//                     error: (e) => {
//                         console.log(e.responseText);
//                     }
//                 });
//             });

//         },
//         error: (e) => {
//             console.log(e.responseText);
//         }
//     });
// });

// fetch
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function () {

//     const inputKeyword = document.querySelector('.input-keyword')
//     fetch('http://www.omdbapi.com/?apikey=21cf67eb&s=' + inputKeyword.value)
//         .then(response => response.json())
//         .then(response => {
//             const movies = response.Search;
//             let cards = '';
//             movies.forEach(m => cards += showCards(m));
//             const moviesContainer = document.querySelector('.movies-container');
//             moviesContainer.innerHTML = cards;


//             // Ketika tombol detail di-klik
//             const modalDetailButton = document.querySelectorAll('.modal-detail-button');
//             modalDetailButton.forEach(btn => {
//                 btn.addEventListener('click', function () {
//                     const imdbid = this.dataset.imdbid;
//                     fetch('http://www.omdbapi.com/?apikey=21cf67eb&i=' + imdbid)
//                         .then(response => response.json())
//                         .then(m => {
//                             const moviesDetail = showMovieDetail(m);
//                             const modalBody = document.querySelector('.modal-body');
//                             modalBody.innerHTML = moviesDetail;
//                         });
//                 });
//             });

//         });

// });

// fungsi pada button search
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    try {
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        // console.log(movies);
        updateUI(movies);
    } catch (log) {
        alert(log);
    }
});

function getMovieDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=21cf67eb&i=' + imdbid)
        .then(response => response.json())
        .then(m => m);
};

function updateUIDetail(m) {
    const moviesDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = moviesDetail;
}


// memanggil data film yang input oleh user
function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=21cf67eb&s=' + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if (response.Response === "False") {
                throw new Error(response.Error);
            }
            // console.log(response);
            return response.Search;
        })
};
// Menampilkan film dicard
function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = cards;
}
// menampilkan detail film
// event binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('modal-detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});






// fungsi untuk menampilkan cardnya
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