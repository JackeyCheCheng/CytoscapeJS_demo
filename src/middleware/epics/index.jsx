import { combineEpics } from 'redux-observable';
import { oauthEpic } from './user';

export const rootEpic = combineEpics(
  oauthEpic
);
