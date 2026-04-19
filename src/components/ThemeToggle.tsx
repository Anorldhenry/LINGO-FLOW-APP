"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-xl border-2 border-border-color bg-surface shrink-0" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center w-9 h-9 shrink-0 rounded-xl border-2 border-border-color bg-surface hover:bg-surface-hover transition-colors"
      title="Toggle Theme"
    >
      <Sun className="h-4 w-4 text-foreground hidden dark:block" />
      <Moon className="h-4 w-4 text-foreground block dark:hidden" />
    </button>
  );
}
