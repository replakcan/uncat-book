import {
  SET_ERROR,
  SET_EVENTID,
  SET_LOADING,
  SET_QUESTIONS,
} from "../actions/uncatActions";

const initialState = {
  questions: [],
  loading: false,
  eventId: null,
  error: null,
};

export default function UncatReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_QUESTIONS:
      return { ...state, questions: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_EVENTID:
      return { ...state, eventId: action.payload };
    default:
      return state;
  }
}
