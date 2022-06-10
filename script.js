$.ajax({
    url: 'http://www.omdbapi.com/?apikey=21cf67eb&s=breaking bad',
    success: result => {
        const moviess = result.Search;
        console.log(moviess);

    },
    error: (e) => {
        console.log(e.responseText);
    }
})