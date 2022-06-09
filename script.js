$.ajax({
    url: 'http://www.omdbapi.com/?apikey=21cf67eb&s=breaking bad',
    success: result => {
        console.log(result);
    },
    error: (e) => {
        console.log(e.responseText);
    }
})