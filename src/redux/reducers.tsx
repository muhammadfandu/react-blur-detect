import { ApplicationState } from './interfaces';

const initialState = {
  threshold1: 0,
};

export const blurReducers = (state: ApplicationState = initialState, action: any) => {
  switch (action.type) {
    case 'UPDATE_THRESHOLD': {
      return { ...state, threshold1: action.payload };
    }

    default: {
      return state;
    }
  }
};
