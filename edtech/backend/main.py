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





# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# import requests

# app = FastAPI()

# # Enable CORS (Allows frontend to access backend)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Change this to specific domains in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# CODEFORCES_API_URL = "https://codeforces.com/api/problemset.problems"

# @app.get("/quiz")
# async def get_questions():
#     response = requests.get(CODEFORCES_API_URL)
#     data = response.json()

#     if data["status"] == "OK":
#         # Filter easy problems (rating ≤ 1200) and get first 5
#         problems = [
#             {
#                 "title": problem["name"],
#                 "difficulty": problem.get("rating", "Unknown"),
#                 "link": f"https://codeforces.com/problemset/problem/{problem['contestId']}/{problem['index']}"
#             }
#             for problem in data["result"]["problems"]
#             if problem.get("rating") and problem["rating"] <= 1200
#         ][:5]

#         return problems

#     return {"error": "Failed to fetch problems"}




# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import requests

# app = FastAPI()

# # Enable CORS (Allows frontend to access backend)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Change this to specific domains in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# MCQ_API_URL = "https://opentdb.com/api.php?amount=5&category=18&type=multiple"  # Category 18 = Science: Computers

# @app.get("/quiz")
# async def get_mcq_questions():
#     try:
#         response = requests.get(MCQ_API_URL)
#         response.raise_for_status()
#         data = response.json()

#         if "results" in data:
#             questions = [
#                 {
#                     "question": item["question"],
#                     "options": item["incorrect_answers"] + [item["correct_answer"]],
#                     "correct_answer": item["correct_answer"],
#                 }
#                 for item in data["results"]
#             ]
#             return {"questions": questions}

#         raise HTTPException(status_code=500, detail="Invalid response from API")

#     except requests.exceptions.RequestException as e:
#         raise HTTPException(status_code=500, detail=f"API request failed: {str(e)}")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import random

app = FastAPI()

# Enable CORS to allow frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow only React frontend
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Trivia API URL (Science: Computers category)
TRIVIA_API_URL = "https://opentdb.com/api.php?amount=5&category=18&type=multiple"

@app.get("/quiz")
async def get_mcq_questions():
    try:
        response = requests.get(TRIVIA_API_URL)  # Fetch data from Trivia API
        response.raise_for_status()  # Raise an error if API fails
        data = response.json()

        if "results" in data:
            questions = []
            for item in data["results"]:
                # Combine correct and incorrect answers
                options = item["incorrect_answers"] + [item["correct_answer"]]
                random.shuffle(options)  # Shuffle options

                # Add formatted question
                questions.append({
                    "question": item["question"],  # Question text
                    "options": options,  # MCQ options
                    "correct_answer": item["correct_answer"]  # Correct answer
                })

            return {"questions": questions}  # Return formatted data

        raise HTTPException(status_code=500, detail="Invalid response from API")

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"API request failed: {str(e)}")
