document.addEventListener("DOMContentLoaded", function () {
    const questionContainer = document.getElementById("question-container");
    const nextBtn = document.getElementById("next-btn");
    const scoreElement = document.getElementById("score");
    const quizCountElement = document.getElementById("quizCount");
    const studyPlanBtn = document.getElementById("study-plan-btn");
    const studyPlanDiv = document.getElementById("study-plan");
    const leaderboardList = document.getElementById("leaderboard-list");
    const darkModeToggle = document.getElementById("darkModeToggle");
    
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let quizCount = 0;
    let timeLeft = 30;
    let timer;

    // Fetch DSA quiz questions from API (Example)
    async function fetchQuestions() {
        try {
            const response = await fetch("https://your-api-link.com/dsa-quiz");
            questions = await response.json();
            loadQuestion();
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const questionData = questions[currentQuestionIndex];
            questionContainer.innerHTML = `
                <p>${questionData.question}</p>
                ${questionData.options.map((opt, i) => `
                    <button class="option" data-index="${i}">${opt}</button>
                `).join("")}
            `;

            document.querySelectorAll(".option").forEach(btn => {
                btn.addEventListener("click", () => checkAnswer(btn, questionData.correctIndex));
            });

            startTimer();
        } else {
            alert("Quiz completed! Generating Study Plan...");
            generateStudyPlan();
        }
    }

    function checkAnswer(btn, correctIndex) {
        if (parseInt(btn.dataset.index) === correctIndex) {
            score += 10;
        }
        scoreElement.textContent = score;
        quizCount++;
        quizCountElement.textContent = quizCount;
        currentQuestionIndex++;
        clearInterval(timer);
        loadQuestion();
    }

    function startTimer() {
        timeLeft = 30;
        document.getElementById("time").textContent = timeLeft;
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById("time").textContent = timeLeft;
            if (timeLeft === 0) {
                alert("Time's up! Moving to next question.");
                currentQuestionIndex++;
                clearInterval(timer);
                loadQuestion();
            }
        }, 1000);
    }

    function generateStudyPlan() {
        let weakTopics = ["Recursion", "Graphs", "Dynamic Programming"]; // Example topics
        let recommendedResources = [
            "https://www.geeksforgeeks.org/data-structures/",
            "https://www.codingninjas.com/courses/dsa",
            "https://leetcode.com/explore/"
        ];
        
        studyPlanDiv.innerHTML = `
            <h3>Your Personalized Study Plan 📚</h3>
            <p><b>Weak Areas:</b> ${weakTopics.join(", ")}</p>
            <p><b>Recommended Resources:</b></p>
            <ul>${recommendedResources.map(res => `<li><a href="${res}" target="_blank">${res}</a></li>`).join("")}</ul>
        `;
    }

    function updateLeaderboard() {
        leaderboardList.innerHTML = `
            <li>👑 Alice - 120 Points</li>
            <li>🔥 Bob - 100 Points</li>
            <li>⚡ Charlie - 90 Points</li>
        `;
    }

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    nextBtn.addEventListener("click", loadQuestion);
    studyPlanBtn.addEventListener("click", generateStudyPlan);

    fetchQuestions();
    updateLeaderboard();
});
