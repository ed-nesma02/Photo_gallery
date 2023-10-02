import {
  ACCESS_KEY,
  API_URI_AUTH,
  API_URI_TOKEN,
  GRANT_TYPE,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  SECRET_KEY,
} from './const';

export const urlAuth = new URL(API_URI_AUTH);

urlAuth.searchParams.append('client_id', ACCESS_KEY);
urlAuth.searchParams.append('redirect_uri', REDIRECT_URI);
urlAuth.searchParams.append('response_type', RESPONSE_TYPE);
urlAuth.searchParams.append('scope', SCOPE);

export const urlToken = new URL(API_URI_TOKEN);

urlToken.searchParams.append('client_id', ACCESS_KEY);
urlToken.searchParams.append('client_secret', SECRET_KEY);
urlToken.searchParams.append('redirect_uri', REDIRECT_URI);
urlToken.searchParams.append('grant_type', GRANT_TYPE);
