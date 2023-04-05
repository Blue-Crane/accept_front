export interface Pager {
  skip: number;
  limit: number;
}

export interface SortBy {
  field: string;
  order: -1 | 1;
}

export interface SearchParams {
  keys: string[];
  search: string;
}

export interface BaseSearch {
  search_params: SearchParams;
  sort_by: SortBy[];
  pager: Pager;
}

export interface DateSearch extends BaseSearch {
  toDate?: Date;
}

export interface UserTaskSearch extends DateSearch {
  users?: string[];
  tasks?: string[];
}
