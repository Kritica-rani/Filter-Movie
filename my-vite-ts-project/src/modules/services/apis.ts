import axios from "axios";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  popularity: number;
  
}



// Function to generate dynamic API endpoint URL with genres
const getFetchMovieDetailsUrl = (year: number = 100, genreId?: number): string => {
  const apiKey = '2dca580c2a14b55200e784d157207b4d';
  const baseUrl = 'https://api.themoviedb.org/3/discover/movie';

  // Construct the query parameters using URLSearchParams
  const queryParams = new URLSearchParams({
    api_key: apiKey,
    sort_by: 'popularity.desc',
    primary_release_year: year.toString(),
    page: '1',
    'vote_count.gte': '150',
  });

  // Append with_genres parameter if genreId is provided
  if (genreId !== undefined) {
    queryParams.append('with_genres', genreId.toString());
  }

  // Construct and return the complete API endpoint URL
  return `${baseUrl}?${queryParams.toString()}`;
};

export const getMovieDetails = async (year: number, genreId?: number): Promise<Movie[]> => {
  // Get the dynamic API endpoint URL based on the specified year and genres
  const url = getFetchMovieDetailsUrl(year, genreId);

  try {
    // Send GET request to the API endpoint using axios
    const response = await axios.get<{ results: Movie[] }>(url);

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      // Return the movie results extracted from the response data
      return response.data.results;
    } else {
      // Log an error if the request was not successful
      console.error('Error fetching movie details - unexpected status:', response.status);
      return []; // Return an empty array in case of error
    }
  } catch (error) {
    // Handle any network or request-related errors
    console.error('Error fetching movie details:', error);
    throw error; // Propagate the error for external error handling
  }
};




export const getGenreList =async () =>  {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784
d157207b4d`;
  const options = {
    method: 'GET',
    headers: { accept: 'application/json' }
  };

  try {
    const response = await fetch(url, options);


    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching genre list:', error);
    return [];
  }
}
