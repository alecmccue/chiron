require('dotenv').config();
const { OpenAI } = require('openai');
const readline = require('readline');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const initialPrompt = `You are to act as an AI Interview assistant to a candidate applying to "Capital One" for a "Software Engineering Developer" position. Here are the details of the position:

Qualifications
• Bachelor's Degree
• 2+ years of experience in software engineering (Internship experience does not apply)

Responsibilities
• In this role you will collaborate with Agile teams to design, develop, test, implement and support technical solutions using JavaScript, React, AWS and other full-stack development tools and technologies
• Share your knowledge with our internal and external technology communities and help to drive cloud-based solutions that empower millions of customers to achieve their financial goals
• Design, develop, and test cloud-based solutions for financial products using React, JavaScript, HTML/CSS, and other tools as necessary
• Maintain current knowledge of new and emerging technologies and trends in software engineering
• Collaborate across teams to participate in Agile development processes, and mentor other members of the engineering team
• Deliver robust solutions that drive powerful experiences for millions of customers

Benefits
• Capital One offers a comprehensive set of benefits that support your total well-being

Key Responsibilities:
• Design, develop, and test cloud-based solutions for financial products using React, JavaScript, HTML/CSS, and other tools as necessary
• Maintain current knowledge of new and emerging technologies and trends in software engineering
• Collaborate across teams to participate in Agile development processes, and mentor other members of the engineering team
• Deliver robust solutions that drive powerful experiences for millions of customers

Basic Qualifications:
• Bachelor's Degree
• 2+ years of experience in software engineering (Internship experience does not apply)

Preferred Qualifications:
• 3+ years of experience in JavaScript, Java, TypeScript, SQL, Python, or Go
• 1+ years of experience with AWS, GCP, Microsoft Azure, or another cloud service
• 2+ years of experience in open source frameworks
• 2+ years of experience in Agile practices

You will first return 2 technical questions based on the position and your relevant knowledge of "Software Engineering Developer".`; // Your initial prompt goes here

let conversationHistory = [
    { role: "system", content: "You are a helpful assistant." }
];

// const initialPrompt = "you are a chatbot";

async function main(userMessage) {
    // Push user message or initial prompt into the conversation history
    if (userMessage) {
      conversationHistory.push({ role: "user", content: userMessage });
    }
  
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: conversationHistory,
    });
  
    const aiMessage = completion.choices[0].message.content;
    console.log("\nAI:", aiMessage);
    conversationHistory.push({ role: "assistant", content: aiMessage });
}

function getInput() {
    rl.question("\nYou: ", (input) => {
        if (input.toLowerCase() === "quit") {
            console.log("Exiting chat...");
            rl.close();
        } else {
            // Call main with the user input
            main(input).then(() => {
                // After processing the input and getting a response, prompt for the next input
                getInput();
            });
        }
    });
}

// Start the conversation with the initial prompt
main(initialPrompt).then(() => {
    getInput(); // After the initial prompt, start prompting for user input
});