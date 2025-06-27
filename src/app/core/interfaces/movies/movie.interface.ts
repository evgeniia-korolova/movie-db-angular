import { ITVCard } from "../tv/tv.interface";

export interface IMovieBase {
  id: number;
  title?: string;
  // name?: string;
  original_title: string;
  original_language?: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string | null;
  release_date: string;
  // first_air_date?: string;
  // media_type?: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
}

export interface IMovieCard extends IMovieBase {
  media_type?: string | undefined;
  popularity?: number | undefined;
}

export interface IMovieDetails extends IMovieBase {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  homepage: string | null;
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

export interface IMovieResponse {
  page: number;
  results: IMovieCard[];
  total_pages: number;
  total_results: number;
}

export interface IMovieWithTrailer extends IMovieCard {
  trailerKey: string | null;
}

export type IContentCard = IMovieCard | ITVCard;
