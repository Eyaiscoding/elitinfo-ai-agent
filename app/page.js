"use client";

import { useEffect, useState } from "react";
import NLQueryForm from "@/components/ui/nl-query-form";
import { CopilotPopup } from "@copilotkit/react-ui";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";

export default function Page() {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md py-5 shadow-md w-full">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <Image
              src="/elitinfo-logo.png"
              alt="ELITINFO company logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          {/* Right side */}
          <div className="flex items-center gap-6">
            <p className="text-green-600 dark:text-green-400 font-semibold italic text-lg">
              Database Assistant
            </p>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-105 transition"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto py-12 w-full px-4">
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
