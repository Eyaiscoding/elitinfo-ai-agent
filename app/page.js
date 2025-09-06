"use client";

import Image from "next/image";
import NLQueryForm from "@/components/ui/nl-query-form";
import { CopilotPopup } from "@copilotkit/react-ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[#d1d2d4] py-4 shadow-sm">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
      <Image
        src="/elitinfo-logo.png"   
        alt="ELITINFO company logo" 
        width={120}
        height={40}
        className="object-contain"
        priority
      />

          </div>

          {/* Subtitle */}
          <p className="hidden md:block text-[#04B75B] font-semibold italic">
            Database Assistant
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="container py-10 space-y-10">
        <NLQueryForm />
      </main>

      {/* Copilot Assistant */}
      <CopilotPopup
        instructions="You are assisting the user as best as you can. Answer in the best way possible given the data you have."
        labels={{
          title: "ELITINFO Assistant",
          initial: "Need any help?",
        }}
      />
    </div>
  );
}
