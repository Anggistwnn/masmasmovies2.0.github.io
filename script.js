$.ajax({
    url: 'http://www.omdbapi.com/?apikey=21cf67eb&s=breaking bad',
    success: result => {
        const movies = result.Search;
        console.log(movies);

    },
    error: (e) => {
        console.log(e.responseText);
    }
})