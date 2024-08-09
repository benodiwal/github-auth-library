class Credentials {

  constructor(
    public accessToken: string,
    public tokenType: string,
    public scope: string
  ) {}

  toJSON(): Record<string, string> {
    return {
      access_token: this.accessToken,
      token_type: this.tokenType,
      scope: this.scope,
    };
  }

  static fromJSON(json: Record<string, string>): Credentials {
    return new Credentials(json.access_token, json.token_type, json.scope);
  }
}

export { Credentials };
