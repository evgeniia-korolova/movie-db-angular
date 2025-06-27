export interface ITVBase {
  id: number;
  name?: string;
  original_name: string;
  original_language: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
}

export interface ITVCard extends ITVBase {
  popularity?: number;
  media_type?: 'tv';
}

export interface ITVWithTrailer extends ITVCard {
  trailerKey: string | null;
}

export interface ITVDetails extends ITVBase {
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  homepage: string | null;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
}

export interface ITVResponse {
  page: number;
  results: ITVCard[];
  total_pages: number;
  total_results: number;
}


// export interface ITVDetails {
//   id: number;
//   name: string;
//   overview: string;
//   poster_path: string | null;
//   backdrop_path: string | null;
//   vote_average: number;
//   vote_count: number;
//   first_air_date: string;
//   last_air_date: string;
//   number_of_seasons: number;
//   number_of_episodes: number;
//   genres: { id: number; name: string }[];
//   original_language: string;
//   status: string;
//   tagline: string;
//   homepage: string;
//   created_by: {
//     id: number;
//     name: string;
//     profile_path: string | null;
//   }[];
//   networks: {
//     id: number;
//     name: string;
//     logo_path: string | null;
//     origin_country: string;
//   }[];
//   production_companies: {
//     id: number;
//     name: string;
//     logo_path: string | null;
//     origin_country: string;
//   }[];
// }


