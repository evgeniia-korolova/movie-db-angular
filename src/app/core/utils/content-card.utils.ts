import { IContentCard, IContentDetails, IMovieCard, IMovieDetails } from "../interfaces/movies/movie.interface";
import { ITVCard, ITVDetails } from "../interfaces/tv/tv.interface";


export function isMovieCard(card: IContentCard): card is IMovieCard {
  return 'title' in card && 'release_date' in card;
}

export function isTVCard(card: IContentCard): card is ITVCard {
  return 'name' in card && 'first_air_date' in card;
}

export function isMovieDetails(content: IContentDetails): content is IMovieDetails {
  return 'title' in content;
}

export function isTVDetails(content: IContentDetails): content is ITVDetails {
  return 'name' in content;
}



