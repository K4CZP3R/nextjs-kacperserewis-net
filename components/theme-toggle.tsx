"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

function ThemeToggle({ initialValue }: { initialValue: Theme }) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(initialValue);

  useEffect(() => {
    document.cookie = `theme=${theme};path=/;`;
    if (theme === "light" || theme === "dark") {
      document.querySelector("html")!.setAttribute("data-theme", theme);
    } else if (theme === "system") {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }, [theme]);

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (e.matches) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      });
  }, [theme]);

  return (
    <details className="dropdown dropdown-top">
      <summary className="btn btn-square btn-outline">
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li>
          <a onClick={() => setTheme("dark")}>Dark</a>
        </li>
        <li>
          <a onClick={() => setTheme("light")}>Light</a>
        </li>
        <li>
          <a onClick={() => setTheme("system")}>System</a>
        </li>
      </ul>
    </details>
  );
}

export default ThemeToggle;
