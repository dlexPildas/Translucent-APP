import { createReducer, on } from "@ngrx/store";

import { hideLoadingComponent, showLoadingComponent } from "./app.actions";

export interface IAppState {
  loading: boolean;
}

export const appInitialState: IAppState = {
  loading: false
}

export const appReducer = createReducer(
  appInitialState,
  on(showLoadingComponent, (state) => {
    state = { ...state, loading: true };

    return state;
  }),
  on(hideLoadingComponent, (state) => {
    state = { ...state, loading: false };

    return state;
  })
)
