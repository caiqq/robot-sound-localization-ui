import {combineReducers} from 'redux';
import configure from '../config.json'

function projectReducer(state = {}, action){
  if(action.changeFlag === true){
    return{
      ...state,
      changeFlag: action.changeFlag,
      conv1: action.conv1,
      conv2: action.conv2,
      conv3: action.conv3,
      conv4: action.conv4,
      location: action.location,
      locationBins: action.locationBins
    }
  }else{
    return {
      ...state,
      changeFlag: action.changeFlag,
      conv1: [],
      conv2: [],
      conv3: [],
      conv4: [],
      location: 0,
      locationBins: [0, 0, 0, 0, 0 ,0 , 0, 0, 0, 0, 0 ,0]
    }
  } 
}

const rootReducer = combineReducers({
  project: projectReducer,
});

export default rootReducer;