export interface IMovie {    
        id: number;
        title: string;
        poster_path: string;
        release_date: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        genre_ids: number[];
        backdrop_path: string;
        original_language: string;
        original_title: string;
        popularity: number;   
}

export interface IMovieWithTrailer extends IMovie {
    trailerKey: string | null;
  }
