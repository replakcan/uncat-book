import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  /* joinEvent, */
  setEventId,
  submitQuestion,
  likeOrDislikeQuestion,
} from "../store/actions/uncatActions";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";

const Home = () => {
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.uncat.loading);
  let { eventId } = useParams()
  const questions = useSelector(state => state.uncat.questions)

  useEffect(() => {
    dispatch(setEventId(eventId))
    dispatch(fetchQuestions())
/*     dispatch(joinEvent())
 */
  }, [dispatch, eventId]);

  const sendQuestion = async ({ question, name }) => {
    dispatch(submitQuestion(question, name))
  };

  const voteQuestion = async (questionId, vote) => {
    dispatch(likeOrDislikeQuestion(questionId, vote))
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSubmit(sendQuestion)}>
        <input
          placeholder="Type your question"
          defaultValue=""
          {...register("question")}
        />
        <input
          placeholder="Your name (optional)"
          defaultValue={undefined}
          {...register("name")}
        />
        <input type="submit" />
      </form>
      <div>
        {questions.map((q) => {
          return (
            <div className="border-4 border-indigo-500 text-center" key={q._id}>
              <p>Question: {q.text}</p>
              <p>Author: {q.user}</p>
              <p>Votes: {q.voters.length}</p>
              <button
                onClick={() =>
                  voteQuestion(q._id, q.voted ? "dislike" : "like")
                }
              >
                like
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
