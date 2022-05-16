import { createAction } from "@ngrx/store";

export const showLoadingComponent = createAction('[VideogamesList] Show loading component');
export const hideLoadingComponent = createAction('[VideogamesList] Hide loading component');

export const showLoadingComponentForm = createAction('[VideogamesForm] Show loading component');
export const hideLoadingComponentForm = createAction('[VideogamesForm] Hide loading component');
