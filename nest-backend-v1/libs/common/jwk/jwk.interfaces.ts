export interface IAccessTokenPayload {
  id: string; // userid
  isAdmin: boolean; // role
}

export interface IRefreshTokenPayload {
  sub: string;
}

export interface ILoginResponse {
  accessToken: string;
  accessTokenExpiresIn: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
}

export function isRefreshToken(object: any): object is IRefreshTokenPayload {
  return 'sub' in object;
}

export interface RequestUser {
  id: string;
  isAdmin: boolean;
}

export interface RequestRefreshUser {
  id: string;
}
