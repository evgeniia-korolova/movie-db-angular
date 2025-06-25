export interface IPersonCredits {
    cast: IPersonCreditItem[];
    crew: IPersonCreditItem[];
  }
  
  export interface IPersonCreditItem {
    id: number;
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
    poster_path: string | null;
    character?: string;
    job?: string;
    media_type: 'movie' | 'tv';
  }