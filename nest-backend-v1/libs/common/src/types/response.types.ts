export interface ResponseObject<T> {
  success: boolean;
  error: string;
  message?: string;
  data?: T;
}

export type CommonResponse = ReturnType<typeof makeResponse>;
export function makeResponse<T>(arg: ResponseObject<T>) {
  return {
    success: arg.success,
    error: arg.error ?? '',
    message: arg.message ?? '',
    data: arg.data ?? {},
  };
}
