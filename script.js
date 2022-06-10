$.ajax({
    url: 'http://www.omdbapi.com/?apikey=21cf67eb&s=harry potter',
    success: result => {
        const movies = result.Search;
        console.log(movies);
        let cards = '';
        movies.forEach(m => {
            cards += `<div class="col-md-4 my-5">
                        <div class="card">
                            <img src="${m.Poster}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${m.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#movieDetailModal">Show Details</a>
                            </div>
                        </div>
                    </div>`
        });
        $('.movies-container').html(cards);
    },
    error: (e) => {
        console.log(e.responseText);
    }
})