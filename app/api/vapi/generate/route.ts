import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function GET() {
  return Response.json(
    {
      success: true,
      data: "THANK YOU",
    },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
    const body = await request.json();
  const { type, role, level, techStack, amount, userId } = body;
    try {
        const { text: questions } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `Prepare questions for a job interview.
            The job role is ${role}.
            The job experience level is ${level}.
            The tech stack is ${techStack}.
            The focus between behavioral and technical questions should lean towards: ${type}.
            The number of questions required is ${amount}. 
            Please return only the questions, without any additional text.
            The questions are going to be read by a voice assistant, so do not use "*", "/", any characters that might break the voice assistant.
            Return the questions formatted like this:
            ["Question 1","Question 2","Question 3"]

            Thanks xx
            `,
        }) 

        const interview = {
            role, type, level,
            techStack: techStack.split(','),
            questions: JSON.parse(questions),
            userId,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        }

        // Store in your database
        await db.collection("interviews").add(interview);
        return Response.json(
            {
                success: true,
                data: interview,
            },
            {
                status: 200,    
            }
        );
    }
    catch (error) {
        console.error("Error in POST request:", error);
        return Response.json(
            {
                success: false,
                error: "An error occurred while processing your request.",
            },
            {
                status: 500,        

            })
        }
}
