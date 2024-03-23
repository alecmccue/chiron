const PORT = 3001;

export function getJob(country = "us", resultsPerPage = "5", page = "1", what = "software engineering",fullTime = "1") {
    const queryParams = new URLSearchParams({
        country, 
        resultsPerPage, 
        page,
        what,
        fullTime
    }).toString();

    return fetch(`http://localhost:${PORT}/getJobs?${queryParams}`)
        .then(response => response.json())
        .then(data => {
            if (data) {            
                // console.log(data);
                return data;
            } else {
                console.log('No data found');
                return null;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return Promise.reject(error);
        });
}


