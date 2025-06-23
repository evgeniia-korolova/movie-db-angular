export interface ITVShow {
    id: number;
    name: string;
    original_name: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    original_language: string;
    genre_ids: number[];
    vote_average: number;
    vote_count: number;
    popularity: number;
  }

  export interface TVShowWithTrailer extends ITVShow {
    trailerKey: string | null;
  }
  
  
  
  