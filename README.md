## Inspiration
The inspiration behind our AI mock interview assistant stemmed from the inspiring capabilities of AI tools like GPT-4 and Gemini. We were captivated by the potential of these technologies to revolutionize the way people work and learn. Drawing from this inspiration, we sought to harness AI's power to create a personalized tool that could help individuals prepare more effectively for job interviews while leveraging their unique experiences and career aspirations.

## What it does
Chiron is an AI interview assistant and mentor which conducts a mock interview for you based on your resume and the job that you are applying to. You can search for jobs through Chiron’s search features or enter in a job of your own, and once you are done with the interview Chiron uses AI in order to grade your interview and display metrics on your performance and mood.

## How we built it
We used many different types of software such as face-api, react-pdf, react-speech-recognition packages in order to perform key functionalities of Chiron such as uploading and reading resume, emotion tracking, and speech-to-text. We also integrated external APIs such as the Adzuna Job Search API to provide a job index to create mock interviews for. User Auth and Database is handled by Firebase, questions are generated and interviews are graded using OpenAI’s API.

## Challenges we ran into
Our primary challenge was time management and working on a product that implements a handful of features in a short amount of time, especially since this was our team’s ever first hackathon. Our face recognition video player was especially difficult to incorporate due to latency issues. We had also attempted to implement a LeetCode environment for mock technical interviews but got cut short on time.

## Accomplishments that we're proud of
Integrating an aesthetic UI, implementing multiple APIs and developing a complete feature list into one application in 24 hours is something we are very proud of. We are proud to have come up with solutions that were necessary to get a product complete in such a short period of time. We were able to develop good code scaling from no application to a complete application and we are proud of our outcome.

## What we learned
We learned how to rapidly plan out, implement, test and roll out features on a very short deadline. We also learned how to solve compromises between quality, efficiency and prioritizing certain features over others. This process honed our abilities to brainstorm ideas, strategize effectively, and execute.

## What's next for Chiron
- Speed and latency for the video player
- A private search index can be used in order to get questions from a question bank alongside questions about resume from OpenAI
- OpenAI Prompt refinement 
- UI Improvements
