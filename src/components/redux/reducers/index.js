import { combineReducers } from 'redux';
// import {authReducer} from './auth';
import {draftReducer} from './draft';

const rootReducer = combineReducers({
  // auth: authReducer,
  draft: draftReducer,
})

export default rootReducer
