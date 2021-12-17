export interface JwtCreateToken {
  pseudo: string;
  sub: string;
  jti?: string;
}

export interface JwtAccessTokenPayload {
  pseudo: string;
  sub: string;
  exp: number;
  iat: number;
}

export interface JwtRefreshTokenPayload {
  pseudo: string;
  sub: string;
  exp: number;
  iat: number;
  jti: string;
}
