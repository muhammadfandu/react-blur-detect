import { ApplicationState } from './interfaces';

const initialState = {
  threshold1: 0.5,
  threshold2: 0.5,
  app_language: 'en',
};

export const blurReducers = (state: ApplicationState = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_THRESHOLD': {
      return { ...state, threshold1: action.payload };
    }
    case 'UPDATE_LANGUAGE': {
      return { ...state, app_language: action.payload };
    }
    default: {
      return state;
    }
  }
};
