import { ofType } from 'redux-observable';
import { mergeMap, startWith, catchError } from 'rxjs/operators';
import { empty, from, of } from 'rxjs';
import {
  oauthSuccess,
  OAUTH_USER
} from '../../actions/user';

export const oauthEpic = (action$) =>
  action$.pipe(
    ofType(OAUTH_USER),
    mergeMap((action) => {
      console.log("actionin epic:", action);
      return of(
        oauthSuccess({
          result: action.payload
        })
      )

    }
  )
);
