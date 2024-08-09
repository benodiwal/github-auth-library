# github-oauth-library

github-oauth-library is a sleek, type-safe TypeScript library for handling GitHub OAuth authentication in your Node.js applications. Simplify your GitHub integration with ease!

## Features 🌟

- 🚀 Easy-to-use API for GitHub OAuth flow
- 🔒 Secure token management
- 📝 Written in TypeScript for enhanced developer experience
- 🧩 Modular design for easy integration
- 🛠 Built-in helpers for common tasks

## Installation 📦

- Using npm
```bash
npm install github-oauth-library
```

- Using yarn
```bash
yarn add github-oauth-library
```

## Quick Start 🚀
Here's a simple example to get you started with github-auth-library:

```typescript
import { OAuth2Client, Credentials, generateRandomState } from 'github-auth-library';

const client = new OAuth2Client(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URI'
);

// Generate authorization URL
const state = generateRandomState();
const authUrl = client.getAuthorizationUrl(['user', 'repo'], state);

// After user authorization, exchange code for token
const code = 'RECEIVED_CODE';
client.getToken(code)
  .then((tokenResponse) => {
    const credentials = new Credentials(
      tokenResponse.access_token,
      tokenResponse.token_type,
      tokenResponse.scope
    );
    console.log('Authenticated!', credentials);
    
    // Use credentials for GitHub API requests...
    
    // When done, revoke the token
    return client.revokeToken(credentials.accessToken);
  })
  .then((revoked) => console.log('Token revoked:', revoked))
  .catch((error) => console.error('Error:', error));
```

## Contributing 🤝
We welcome contributions

## ToDos:
- Support for other OAuth flows (e.g., device flow)
- Error handling and retries

## License 📄
github-oauth-library is MIT licensed. See the [LICENSE](LICENSE) file for details.
