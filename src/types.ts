export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
  accessTokenExpires: number
  refreshTokenExpires: number
}

export interface AccessTokenResponse {
  accessToken: string
  accessTokenExpires: number
}

export interface UserSetCards {
  username: string
  name: string
  id: number
}
