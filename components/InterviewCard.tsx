import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback ? feedback.createdAt : createdAt || Date.now()
  ).format("MMM DD, YYYY");
  return (
    <div className="card-border w-[360px] msx-sm:w-full">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-2 py-2 rounded-bl-lg bg-light-600">
            <p className="badge-text">{normalizedType}</p>
          </div>

          <Image
            src={getRandomInterviewCover()}
            alt="Cover Image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          <h3 className="mt-5 capitalize">{role} Interview</h3>

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 ">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={22}
                height={22}
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="star.svg" alt="star" width={22} height={22} />
              <p>{feedback ? `${feedback.totalScore}/100` : "N/A"}</p>
            </div>
          </div>

          <p className="line-clamp-2 mt-5">
            {feedback
              ? feedback.finalAssessment || "You haven’t received feedback yet."
              : "You haven’t started this interview yet."}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interviews/${interviewId}/feedback`
                  : `/interviews/${interviewId}`
              }
            >
              {feedback ? "Check feedback" : "Start interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
