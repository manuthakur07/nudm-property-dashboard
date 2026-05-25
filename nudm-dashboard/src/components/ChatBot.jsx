import React, { useState } from "react";

function ChatBot({ summary }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

 const askAI = () => {
  const q = question.toLowerCase();

  const data = summary;

  let foundCity = null;

  Object.keys(data).forEach((city) => {
    if (q.includes(city.toLowerCase())) {
      foundCity = city;
    }
  });

  if (foundCity) {
    const cityData = data[foundCity];

    if (q.includes("approved")) {
      setAnswer(
        `${foundCity} has ${cityData.approved} approved properties.`
      );
    }

    else if (q.includes("rejected")) {
      setAnswer(
        `${foundCity} has ${cityData.rejected} rejected properties.`
      );
    }

    else if (q.includes("pending")) {
      setAnswer(
        `${foundCity} has ${cityData.pending} pending properties.`
      );
    }

    else if (q.includes("collection")) {
      setAnswer(
        `${foundCity} total collection is ₹${cityData.collection}.`
      );
    }

    else {
      setAnswer("Please ask about approved, rejected, pending, or collection.");
    }
  }

  else if (q.includes("highest collection")) {
    let topCity = "";
    let max = 0;

    Object.keys(data).forEach((city) => {
      if (data[city].collection > max) {
        max = data[city].collection;
        topCity = city;
      }
    });

    setAnswer(
      `${topCity} has the highest total collection of ₹${max}.`
    );
  }

  else {
    setAnswer("Sorry, I could not understand the question.");
  }
};

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">
        AI Chat Assistant
      </h2>

      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-3 w-full rounded-lg mb-4"
      />

      <button
        onClick={askAI}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Ask AI
      </button>

      {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          {answer}
        </div>
      )}
    </div>
  );
}

export default ChatBot;