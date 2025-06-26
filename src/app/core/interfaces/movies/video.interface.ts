export interface IVideo {
  id: string;
  key: string;
  name: string;
  site: 'YouTube' | 'Vimeo';
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Opening Credits';
  official: boolean;
  published_at: string;
  iso_639_1: string;
  iso_3166_1: string;
}

export interface IVideoResponse {
  id: number;
  results: IVideo[];
}

export interface ILatestTrailersResponse {
  page: number;
  results: IVideo[];
  total_pages: number;
  total_results: number;
}
