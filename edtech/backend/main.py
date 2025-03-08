# from fastapi import FastAPI
# import requests

# app = FastAPI()

# CODEFORCES_API_URL = "https://codeforces.com/api/problemset.problems"

# @app.get("/quiz")
# def get_quiz():
#     response = requests.get(CODEFORCES_API_URL)
#     data = response.json()

#     if data["status"] != "OK":
#         return {"error": "Failed to fetch problems from Codeforces"}

#     problems = data["result"]["problems"][:5]  # Get first 5 questions
#     formatted_questions = []

#     for problem in problems:
#         formatted_questions.append({
#             "title": problem["name"],
#             "difficulty": problem.get("rating", "Unknown"),
#             "link": f"https://codeforces.com/problemset/problem/{problem['contestId']}/{problem['index']}",
#             "options": ["A", "B", "C", "D"],  # Placeholder options
#             "correct_answer": "A"  # Placeholder answer
#         })

#     return formatted_questions

# # Run the FastAPI server
# # Run with: uvicorn main:app --reload





from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Enable CORS (Allows frontend to access backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CODEFORCES_API_URL = "https://codeforces.com/api/problemset.problems"

@app.get("/quiz")
async def get_questions():
    response = requests.get(CODEFORCES_API_URL)
    data = response.json()

    if data["status"] == "OK":
        # Filter easy problems (rating ≤ 1200) and get first 5
        problems = [
            {
                "title": problem["name"],
                "difficulty": problem.get("rating", "Unknown"),
                "link": f"https://codeforces.com/problemset/problem/{problem['contestId']}/{problem['index']}"
            }
            for problem in data["result"]["problems"]
            if problem.get("rating") and problem["rating"] <= 1200
        ][:5]

        return problems

    return {"error": "Failed to fetch problems"}