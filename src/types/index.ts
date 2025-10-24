// API Response Types will be defined here
// TODO: Add types based on Swagger API documentation

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}
