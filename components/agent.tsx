import Image from "next/image";
import React from "react";
import classnames from "classnames";
import { cn } from "@/lib/utils";

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

const Agent = ({ userName }: AgentProps) => {
  const isSpeaking = true; // This would be a state or prop in a real application
  const callStatus: CallStatus = CallStatus.CONNECTING; // This would be a state or prop in a real application

  const mockMessages = [
    "What is your name?",
    "My name is John Doe. Nice to meet you!",
  ];

  const lastMessage = mockMessages[mockMessages.length - 1];

  const btnSpanClassNames = classnames(
    "absolute",
    "animate-ping",
    "rounded-full",
    "opacity-75",
    {
      hidden: callStatus !== CallStatus.ACTIVE,
    }
  );
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />

            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {/* Transcript */}
      {mockMessages.length > 0 && (
        <div className="transcript-border">
          <div className="transscript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call">
            <span className={btnSpanClassNames} />
            <span>
              {callStatus === CallStatus.INACTIVE ||
              callStatus === CallStatus.FINISHED
                ? "Call"
                : "..."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">
            <span>Disconnect</span>
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
