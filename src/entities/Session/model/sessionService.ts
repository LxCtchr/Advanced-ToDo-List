class SessionService {
  private _accessToken: string | null = null;

  get accessToken() {
    return this._accessToken;
  }

  set accessToken(token: string | null) {
    this._accessToken = token;
  }

  clearTokens() {
    this._accessToken = null;
    localStorage.removeItem("refreshToken");
  }
}

export const sessionService = new SessionService();
