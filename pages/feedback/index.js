import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

export default function FeedbackPage({ feedbackItems }) {
  const [feedbackOne, setFeedbackOne] = useState();

  function loadFeedbackOneHandler(id) {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedbackOne(data.feedback));
  }
  return (
    <>
      {feedbackOne && <p>{feedbackOne.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.feedbackText}
            <button onClick={loadFeedbackOneHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: { feedbackItems: data },
  };
}
