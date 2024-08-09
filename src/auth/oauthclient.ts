import axios from 'axios';
import { AUTHORIZATION_ENDPOINT, TOKEN_ENDPOINT } from '../constants';
import { TokenResponse } from '../types';

class OAuth2Client {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;
  private readonly authorizationEndpoint: string = AUTHORIZATION_ENDPOINT;
  private readonly tokenEndpoint: string = TOKEN_ENDPOINT;

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  getAuthorizationUrl(scope: string[], state: string): string {
    const url = new URL(this.authorizationEndpoint);
    url.searchParams.append('client_id', this.clientId);
    url.searchParams.append('redirect_uri', this.redirectUri);
    url.searchParams.append('scope', scope.join(' '));
    url.searchParams.append('state', state);

    return url.toString();
  }

  async getToken(code: string): Promise<TokenResponse> {
    const response = await axios.post<TokenResponse>(
      this.tokenEndpoint,
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: code,
        redirect_uri: this.redirectUri,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return response.data;
  }

  async revokeToken(token: string): Promise<boolean> {
    const response = await axios.delete(
      `https://api.github.com/applications/${this.clientId}/token`,
      {
        auth: {
          username: this.clientId,
          password: this.clientSecret,
        },
        data: {
          access_token: token,
        },
      }
    );

    return response.status === 204;
  }
}

export { OAuth2Client };
