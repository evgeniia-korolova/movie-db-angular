import { IKnownForItem } from './known-for-item.interface';

export interface IBasePerson {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
}

export interface IPersonListItem extends IBasePerson{  
  known_for: IKnownForItem[];
}

export interface IPeopleResponse {
  page: number;
  results: IPersonListItem[];
  total_pages: number;
  total_results: number;
}

export interface IPersonDetails extends IBasePerson {  
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  also_known_as: string[];
  homepage: string | null;
  gender: number;
}
