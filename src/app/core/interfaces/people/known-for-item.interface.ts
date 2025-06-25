export interface IKnownForItem {
    id: number;
    title?: string;        // для фильма
    name?: string;         // для сериала
    poster_path: string | null;
    media_type: 'movie' | 'tv';
    release_date?: string;
    first_air_date?: string;
  }