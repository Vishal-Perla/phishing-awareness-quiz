document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const welcomeScreen = document.getElementById("welcome");
  const quizContainer = document.querySelector(".quiz-container");
  const questionContainer = document.getElementById("question-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");
  const resultsContainer = document.getElementById("results");

  const quizQuestions = [
  {
    type: "image",
    question: "You have been applying for jobs on various apps, and you get this text from a random number. Is this a phishing/scam message?",
    image: "images/fakejob.jpeg",
    answers: {
      a: "Yes, it looks like a scam",
      b: "No, it seems legitimate"
    },
    correctAnswer: "a",
    explanation: "Scammers often pose as recruiters to steal personal info. The random number and vague message are classic red flags."
  },
  {
    type: "text",
    question: "An email says: 'URGENT! Your account will be deleted unless you click this link now.' Is this a red flag?",
    answers: {
      a: "Yes, urgency is a common phishing tactic",
      b: "No, it could be an emergency even if it is from a random number"
    },
    correctAnswer: "a",
    explanation: "Phishers create urgency to trick you into acting quickly without thinking. Always pause and verify."
  },
  {
    type: "text",
    question: "The email address is: support@paypall-security.com. Is this a trusted sender?",
    answers: {
      a: "Yes",
      b: "No"
    },
    correctAnswer: "b",
    explanation: "Look closely — 'Paypall' is misspelled. Always inspect the domain name before trusting emails."
  },
  {
    type: "image",
    question: "Is this pop-up trying to scam you?",
    image: "images/fakescam.png",
    answers: {
      a: "Yes",
      b: "No"
    },
    correctAnswer: "a",
    explanation: "Pop-ups warning of account issues and asking for info are almost always scams. Real sites don’t do that."
  },
  {
    type: "text",
    question: "You receive an email offering a remote internship opportunity that pays $400/week. It asks you to log in with your school credentials on a website that looks like this: https://intern-opportunity.verify-now.co. Is it safe?",
    answers: {
      a: "Yes, the site looks professional and internship-related.",
      b: "This seems shady, I should never enter my credentials on unfamiliar websites.",
    },
    correctAnswer: "b",
    explanation: "Scammers often create realistic-looking login pages to steal school or email credentials. The URL here is a giveaway — legit organizations use domains tied to their official sites. Never enter your login info unless you're sure the site is trusted and verified.",
  },
  {
    type: "text",
    question: "An email has no spelling mistakes, a clean layout, and the sender is `support@amazon.com`. Is this always safe?",
    answers: {
      a: "Yes, that’s a good sign",
      b: "No, even legit-looking emails can be fake"
    },
    correctAnswer: "b",
    explanation: "Even spoofed emails can look perfect. Always verify links and login by going directly to the site."
  },
  {
    type: "image",
    question: "You recently drove on a toll road and get this message from a random number. Can you trust it?",
    image: "images/nr1.png",
    answers: {
      a: "Yes",
      b: "No"
    },
    correctAnswer: "b",
    explanation: "Scammers replicate login pages to steal passwords. Check the domain in the address bar — it must be microsoft.com."
  },
  {
    type: "text",
    question: "You get an email from your school IT team asking to reset your password. The sender is listed outside your domain, do you still trust it?",
    answers: {
      a: " Just to be safe I would click on the email",
      b: "Seems suspicious, I wouldn't click on any link and instead report it to my school IT help desk"
    },
    correctAnswer: "b",
    explanation: "University IT would never use an unauthorized address. Look for official domains like `.edu` or internal portals."
  },
  {
    type: "text",
    question: "Your phone browser says 'Congratulations! You've won a free PS5. Click here to redeem.' What do you do?",
    answers: {
      a: "Click it — I could be lucky!",
      b: "Ignore and close the tab"
    },
    correctAnswer: "b",
    explanation: "These fake popups are bait to install malware or steal info. No company gives out PS5s randomly."
  },
  {
    type: "text",
    question: "Your mom texts you asking for your bank login. The username checks out. What should you do?",
    answers: {
      a: "Give it — it’s Mom!",
      b: "Call to confirm it’s actually her"
    },
    correctAnswer: "b",
    explanation: "Even trusted contacts can be hacked. Always verify suspicious requests by calling the person directly."
  },
  {
    type: "text",
    question: "An email ends with 'Sent from iPhone' and looks like it's from your boss. It asks for urgent help buying gift cards.",
    answers: {
      a: "Do it, they’re in a rush",
      b: "Double check by texting or calling them"
    },
    correctAnswer: "b",
    explanation: "Gift card scams are super common. The casual signature is a trick to make it seem personal."
  },
  {
    type: "text",
    question: "You just signed up for a streaming service. You get an email asking to confirm your payment via a different site. Is that okay?",
    answers: {
      a: "Sure — I just signed up!",
      b: "No, only trust links directly from the site I used"
    },
    correctAnswer: "b",
    explanation: "Phishers take advantage of timing. Don’t trust unexpected emails — go directly to the platform instead."
  }
];

  let currentQuestionIndex = 0;
  let userAnswers = new Array(quizQuestions.length).fill(null);

  startBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    quizContainer.style.display = "block";
    document.querySelector(".nav-buttons").style.display = "block";
    showQuestion(currentQuestionIndex);
  });

  function showQuestion(index) {
    const q = quizQuestions[index];
    let html = `<p><strong>Question ${index + 1} of ${quizQuestions.length}</strong><br>${q.question}</p>`;

    if (q.type === "image" && q.image) {
      html += `<img src="${q.image}" alt="Question Image" class="quiz-image"><br>`;
    }

    for (let key in q.answers) {
      const checked = userAnswers[index] === key ? "checked" : "";
      html += `
        <label>
          <input type="radio" name="answer" value="${key}" ${checked} />
          ${q.answers[key]}
        </label><br>
      `;
    }

    questionContainer.innerHTML = html;

    prevBtn.style.display = index === 0 ? "none" : "inline-block";
    nextBtn.style.display = index === quizQuestions.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = index === quizQuestions.length - 1 ? "inline-block" : "none";
  }

  function saveAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
      userAnswers[currentQuestionIndex] = selected.value;
    }
  }

  window.nextQuestion = () => {
    saveAnswer();
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    }
  };

  window.prevQuestion = () => {
    saveAnswer();
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
    }
  };

  window.submitQuiz = () => {
  saveAnswer();
  let score = 0;
  let feedback = "";

  quizQuestions.forEach((q, i) => {
    const userAnswer = userAnswers[i];
    if (userAnswer === q.correctAnswer) {
      score++;
    } else {
      feedback += `<p><strong>Question ${i + 1}:</strong> ${q.question}<br/>
        <span style="color: red;">Your answer: ${userAnswer}</span><br/>
        <span style="color: green;">Correct answer: ${q.correctAnswer}</span><br/>
        <em>${q.explanation}</em></p>`;
    }
  });

  const resultText =
    score === quizQuestions.length
      ? `✅ Perfect! You got all ${score}/${quizQuestions.length} questions right!`
      : `❌ You got ${score}/${quizQuestions.length}. Try again for a perfect score.<br/><br/>${feedback}`;

  document.getElementById("results").innerHTML = resultText;
  document.getElementById("question-container").style.display = "none";
  document.querySelector(".nav-buttons").style.display = "none";
  document.getElementById("retry-btn").style.display = "inline-block";

  // 👉 Show certificate section if 100% score
  if (score === quizQuestions.length) {
    document.getElementById("certificate").style.display = "block";
  }
};

function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  document.getElementById("results").innerHTML = "";
  document.getElementById("question-container").style.display = "block";
  document.querySelector(".nav-buttons").style.display = "flex"; // or "block" depending on your styling
  document.getElementById("retry-btn").style.display = "none";
  showQuestion(currentQuestionIndex);
}

window.restartQuiz = restartQuiz;

window.downloadCertificate = () => {
  const name = document.getElementById("cert-name").value.trim();
  if (!name) {
    alert("Please enter your name before downloading the certificate.");
    return;
  }

  const certElement = document.getElementById("certificate").cloneNode(true);
  certElement.querySelector("#cert-name").remove(); // Remove input
  const nameEl = document.createElement("h3");
  nameEl.textContent = name;
  nameEl.style.fontSize = "22px";
  nameEl.style.margin = "10px 0";
  certElement.insertBefore(nameEl, certElement.children[2]);

  html2pdf().from(certElement).set({
    margin: 1,
    filename: `${name}_Phishing_Certificate.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }).save();
};


});
