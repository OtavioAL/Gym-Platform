export interface IPropsErrosRequest {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
  code?: string;
  name?: string;
}
