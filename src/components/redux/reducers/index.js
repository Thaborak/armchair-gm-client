import { combineReducers } from 'redux';
import {authReducer} from './auth';
import {draftReducer} from './draft';
import {teamReducer} from './team'

const rootReducer = combineReducers({
  auth: authReducer,
  draft: draftReducer,
  team: teamReducer,
})

export default rootReducer
