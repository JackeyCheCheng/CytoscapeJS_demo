export const OAUTH_SUCCESS = 'OAUTH_SUCCESS';
export const OAUTH_USER = 'OAUTH_USER';

export const oauthSuccess = (result) => ({
  type: OAUTH_SUCCESS,
  payload: result.result,
});

export const oauthUser = (result) => ({
  type: OAUTH_USER,
  payload: result,
});