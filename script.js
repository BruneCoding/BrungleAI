alert(
  "keep in mind that this is still in its testing phase. currently In version 0.0.1 Alpha ( check top right corner for info on how to make this v1 where we will make it so that it will do your homework just one click ). This took a while to make, so much appreciated with a follow and a heart. Make sure to comment any bugs if you find any. This is part of Codathon 24, this took 5 hrs 23 minutes and 17 seconds to make, so yeah. check out my codathon in codathonsss website, and search brune!"
);

const API_KEY = "AIzaSyBlHGI654VaNKo-6_T0NaLC_ooOFc5ZWa8";

document.getElementById("send-btn").addEventListener("click", () => {
  const userInput = document.getElementById("user-input").value;

  if (userInput) {
    appendMessage(userInput, "user-message");
    document.getElementById("user-input").value = "";
    fetchAiResponse(userInput);
  } else {
  }
});

function appendMessage(message, className) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function fetchAiResponse(userMessage) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: userMessage
            }
          ]
        }
      ]
    })
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Error ${response.status}: ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.candidates && data.candidates.length > 0) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        appendMessage(aiResponse, "ai-message");
      } else {
        appendMessage("Sorry, I couldn't process that.", "ai-message");
      }
    })
    .catch((error) => {
      appendMessage(`Error: ${error.message}`, "ai-message");
    });
}

console.log("Script has started dumba$$");
