export interface JwtBasePayload {
  /**
   * Token timestamp creation
   */
  iat: number;

  /**
   * Token timestamp expiration
   */
  exp: number;
}

export interface JwtAccessTokenInput {
  /**
   * User pseudo
   */
  pseudo: string;

  /**
   * User ID
   */
  sub: string;
}

export interface JwtRefreshTokenInput extends JwtAccessTokenInput {
  /**
   * JWT Refresh Token ID
   */
  jti: string;
}

export interface JwtCreateToken {
  /**
   * User pseudo
   */
  pseudo: string;

  /**
   * User ID
   */
  sub: string;

  /**
   * JWT Refresh Token ID
   */
  jti?: string;
}

export interface JwtAccessTokenPayload
  extends JwtBasePayload,
    JwtAccessTokenInput {}

export interface JwtRefreshTokenPayload
  extends JwtBasePayload,
    JwtAccessTokenInput,
    JwtRefreshTokenInput {}
