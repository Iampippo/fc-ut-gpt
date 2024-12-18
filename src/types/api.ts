export interface ChatResponse {
  response: string;
  timestamp?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}