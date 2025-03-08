// Sample AI-generated study plan data
const studyPlan = {
    weakTopics: [
        { name: "Graph Algorithms", resources: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
        { name: "Dynamic Programming", resources: "https://www.youtube.com/watch?v=oBt53YbR9Kk" },
        { name: "Recursion & Backtracking", resources: "https://www.interviewbit.com/courses/programming/topics/backtracking/" }
    ],
    dailyGoals: [
        { day: "Monday", goal: "Revise Graphs + 3 practice problems" },
        { day: "Tuesday", goal: "Learn DP concepts + 2 coding challenges" },
        { day: "Wednesday", goal: "Work on Recursion + 4 LeetCode problems" }
    ]
};

// Populate Recommended Topics
const topicsList = document.getElementById("topics-list");
studyPlan.weakTopics.forEach(topic => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${topic.name} - <a href="${topic.resources}" target="_blank">Study Resource</a>`;
    topicsList.appendChild(listItem);
});

// Populate Daily Learning Goals
const dailyGoalsList = document.getElementById("daily-goals");
studyPlan.dailyGoals.forEach(goal => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<b>${goal.day}:</b> ${goal.goal}`;
    dailyGoalsList.appendChild(listItem);
});

// AI Chatbot Simulation
document.getElementById("chatbot-btn").addEventListener("click", function () {
    const chatbotResponse = document.getElementById("chatbot-response");
    chatbotResponse.innerText = "🤖 'Struggling with recursion? Try visualizing the stack frames. Need help with DP? Break problems into subproblems!'";
});
