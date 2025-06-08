import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice and Feedback</h2>
          <p className="text-lg">
            Practice on your own schedule with AI-powered interview practice.
            Get personalized feedback and improve your skills with every
            session.
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/auth/sign-in">Start Practicing Now</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="AI Robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {
            dummyInterviews.map((interview) => (<InterviewCard key={interview.id} {...interview} /> ))
          }
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>

        <div className="interviews-section">
          {
            dummyInterviews.map((interview) => (<InterviewCard key={interview.id}  {...interview} /> ))
          }

          <p>You haven&apos;t started any interviews yet.</p>
        </div>
      </section>
    </div>
  );
};

export default Page;
