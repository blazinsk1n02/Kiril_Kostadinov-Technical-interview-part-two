import { combineReducers } from 'redux'

import usersReducer from './users'
import postsReducer from './posts'

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
})

export default rootReducer