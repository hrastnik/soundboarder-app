// Standard Laravel responses:

// export interface PaginatedResponse<Data> {
//   data: Data[];
//   links: {
//     first?: string;
//     last?: string;
//     next?: string;
//     prev?: string;
//   };
//   meta: {
//     current_page: number;
//     from: number;
//     last_page: number;
//     path: string;
//     per_page: number;
//     to: number;
//     total: number;
//   };
// }

// export interface Response<Data> {
//   data: Data;
// }

export interface PaginatedResponse<Data> {
  results: Data[];
  next: string | null;
  previous: string | null;
  count: number;
}

export type Response<Data> = Data;
