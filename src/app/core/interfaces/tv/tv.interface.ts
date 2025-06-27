


export interface ITVDetails {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
    first_air_date: string;
    last_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
    genres: { id: number; name: string }[];
    original_language: string;
    status: string;
    tagline: string;
    homepage: string;
    created_by: {
      id: number;
      name: string;
      profile_path: string | null;
    }[];
    networks: {
      id: number;
      name: string;
      logo_path: string | null;
      origin_country: string;
    }[];
    production_companies: {
      id: number;
      name: string;
      logo_path: string | null;
      origin_country: string;
    }[];
  }