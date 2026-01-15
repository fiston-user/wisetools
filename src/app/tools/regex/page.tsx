"use client";

import { useState, useMemo } from "react";
import { RegexIcon } from "@/components/icons";

interface Match {
  text: string;
  index: number;
  groups: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState(
    "The quick brown fox jumps over the lazy dog.\nEmail: test@example.com\nPhone: 123-456-7890"
  );

  const { regex, error, matches } = useMemo(() => {
    if (!pattern) {
      return { regex: null, error: null, matches: [] };
    }

    try {
      const re = new RegExp(pattern, flags);
      const matchList: Match[] = [];
      let match;

      if (flags.includes("g")) {
        while ((match = re.exec(testString)) !== null) {
          matchList.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match[0].length === 0) re.lastIndex++;
        }
      } else {
        match = re.exec(testString);
        if (match) {
          matchList.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      return { regex: re, error: null, matches: matchList };
    } catch (e) {
      return { regex: null, error: (e as Error).message, matches: [] };
    }
  }, [pattern, flags, testString]);

  const highlightedText = useMemo(() => {
    if (!regex || matches.length === 0) {
      return testString;
    }

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
      if (match.index > lastIndex) {
        parts.push(testString.slice(lastIndex, match.index));
      }
      parts.push(
        <mark key={i} className="bg-yellow-500/40 text-yellow-200 rounded px-0.5">
          {match.text}
        </mark>
      );
      lastIndex = match.index + match.text.length;
    });

    if (lastIndex < testString.length) {
      parts.push(testString.slice(lastIndex));
    }

    return parts;
  }, [testString, regex, matches]);

  const flagOptions = [
    { value: "g", label: "Global", description: "Find all matches" },
    { value: "i", label: "Case Insensitive", description: "Ignore case" },
    { value: "m", label: "Multiline", description: "^ and $ match line boundaries" },
    { value: "s", label: "Dotall", description: ". matches newlines" },
  ];

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags(flags + flag);
    }
  };

  const commonPatterns = [
    { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
    { name: "URL", pattern: "https?://[\\w\\-._~:/?#\\[\\]@!$&'()*+,;=%]+" },
    { name: "Phone", pattern: "\\d{3}[-.\\s]?\\d{3}[-.\\s]?\\d{4}" },
    { name: "IP Address", pattern: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b" },
    { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
    { name: "Hex Color", pattern: "#[0-9a-fA-F]{3,6}\\b" },
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <RegexIcon className="w-8 h-8" />
        Regex Tester
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Pattern</label>
          <div className="flex gap-2">
            <span className="px-3 py-2 bg-card border border-card-border rounded-l-lg text-muted">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="flex-1 px-4 py-2 bg-card border-y border-card-border focus:outline-none focus:border-primary"
            />
            <span className="px-3 py-2 bg-card border border-card-border rounded-r-lg text-muted">/{flags}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Flags</label>
          <div className="flex flex-wrap gap-2">
            {flagOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleFlag(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  flags.includes(opt.value)
                    ? "bg-primary text-white"
                    : "bg-card border border-card-border hover:border-primary"
                }`}
                title={opt.description}
              >
                {opt.label} ({opt.value})
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Common Patterns</label>
          <div className="flex flex-wrap gap-2">
            {commonPatterns.map((p) => (
              <button
                key={p.name}
                onClick={() => setPattern(p.pattern)}
                className="px-3 py-1.5 bg-card border border-card-border rounded-lg text-sm hover:border-primary transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 bg-card border border-card-border rounded-lg focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">
              Result ({matches.length} match{matches.length !== 1 ? "es" : ""})
            </label>
          </div>
          <div className="px-4 py-3 bg-card border border-card-border rounded-lg whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {highlightedText}
          </div>
        </div>

        {matches.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">Match Details</label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {matches.map((match, i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-card border border-card-border rounded-lg flex items-center justify-between"
                >
                  <div>
                    <code className="text-green-400">{match.text}</code>
                    {match.groups.length > 0 && (
                      <span className="text-muted text-sm ml-3">
                        Groups: {match.groups.map((g, j) => (
                          <code key={j} className="text-blue-400 mx-1">{g || "(empty)"}</code>
                        ))}
                      </span>
                    )}
                  </div>
                  <span className="text-muted text-sm">Index: {match.index}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
