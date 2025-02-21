import axios from "axios";

export const SET_ERROR = "SET_ERROR";
export const SET_QUESTIONS = "SET_QUESTIONS";
export const SET_LOADING = "SET_LOADING";
export const SET_EVENTID = "SET_EVENTID";

const socket = window.ss

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
})

export const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  payload: questions,
});

export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading
})

export const setEventId = (eventId) => ({
    type: SET_EVENTID,
    payload: eventId
})

export const joinEvent = () => {
  return (dispatch, getState) => {
    const eventId = getState().uncat.eventId
    if (eventId) {
      socket.emit('join-room', eventId)
    }
  }
}

export const fetchQuestions = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    await axios({
      method: "get",
      url: `http://localhost:3000/api/events/${getState().uncat.eventId}/questions`,
    })
      .then((res) => {
        dispatch({
          type: SET_QUESTIONS,
          payload: res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch({
          type: SET_LOADING,
          payload: false,
        });
      });
  };
};

export const submitQuestion = (question, name) => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true });
    await axios({
      method: "post",
      url: `http://localhost:3000/api/events/${getState().uncat.eventId}/questions`,
      data: { text: question, user: name },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch({ type: SET_LOADING, payload: false });
      });
  };
};

export const likeOrDislikeQuestion = (questionId, vote) => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_LOADING, payload: true });
    await axios({
      method: "patch",
      url: `http://localhost:3000/api/events/${getState().uncat.eventId}/questions/${questionId}`,
      data: { vote: vote },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch({ type: SET_LOADING, payload: false });
      });
  };
};


