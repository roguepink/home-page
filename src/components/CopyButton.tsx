"use client";

import { useState } from "react";

// LINE やインスタの中のブラウザなど、navigator.clipboard が使えない所がある。
// そのときは昔ながらのやり方でコピーする
function copyWithTextarea(value: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      ok = copyWithTextarea(value);
    }
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="メールアドレスをコピー"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-pink/50 hover:text-pink-light"
    >
      {copied ? (
        <span className="text-xs font-bold text-pink-light">✓</span>
      ) : (
        <span className="text-xs font-bold">コピー</span>
      )}
    </button>
  );
}
