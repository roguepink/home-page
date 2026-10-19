"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

// アプリとゲームの一覧(2026-10-19 ノブさんの指示)
//
//   Google Play のように、アイコンと名前を一覧に並べる。押すと、下から説明が出てくる。
//   前は1本ずつ大きなカードで、下へ長くスクロールしないと全部が見えなかった。
//   今は数が多くないので、一覧なら1画面でほぼ全部が見渡せる。
//
//   アドレスの末尾に #slug を付けると、その説明が開いた状態で出る(前に送ったリンクもそのまま使える)

export type StoreItem = {
  slug: string;
  name: string;
  /** 名前の下に小さく出す、日本語の読み(英語の名前のときだけ) */
  subName?: string;
  /** どんなものかの一言。一覧では名前の下に出す */
  eyebrow: string;
  description: string;
  features: string[];
  /** どの端末で使えるか */
  devices?: string;
  url: string;
  icon: string;
  /** 説明の中に出す大きな絵(ゲームの画面) */
  cover?: string;
  coverAlt?: string;
};

type StoreListProps = {
  items: StoreItem[];
  /** 説明の中の大きなボタンの文字(「あそぶ」「使ってみる」) */
  action: string;
};

function Icon({ src, size }: { src: string; size: number }) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      unoptimized
      className="shrink-0 rounded-[22%] border border-white/10 bg-background"
      style={{ width: size, height: size }}
    />
  );
}

export default function StoreList({ items, action }: StoreListProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<StoreItem | null>(null);

  const open = useCallback((item: StoreItem) => {
    setCurrent(item);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    // 後ろのページが一緒にスクロールしないようにする
    document.documentElement.style.overflow = "hidden";
    history.replaceState(null, "", `#${item.slug}`);
  }, []);

  // 閉じたら(×・外側・戻るキー・Esc のどれでも)ここに来る
  const onClose = useCallback(() => {
    document.documentElement.style.overflow = "";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  }, []);

  // #slug 付きで開かれたら、その説明を出す
  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(location.hash.slice(1));
      const item = items.find((i) => i.slug === slug);
      if (item) open(item);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [items, open]);

  return (
    <>
      <ul className="grid gap-1 rounded-3xl border border-border bg-background-elevated/60 p-2 sm:grid-cols-2 sm:p-3">
        {items.map((item) => (
          <li key={item.slug}>
            <button
              type="button"
              onClick={() => open(item)}
              className="flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-colors hover:bg-white/5 focus-visible:bg-white/5 active:bg-white/10"
            >
              <Icon src={item.icon} size={64} />
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 block font-bold leading-snug text-foreground">
                  {item.name}
                </span>
                <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted">
                  {item.eyebrow}
                </span>
              </span>
              <span aria-hidden="true" className="shrink-0 text-lg text-muted">
                ›
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={onClose}
        // 外側(暗いところ)を押したら閉じる
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        aria-label={current?.name}
        className="store-sheet fixed outline-none inset-x-0 bottom-0 top-auto m-0 max-h-[90dvh] w-full max-w-none overflow-y-auto rounded-t-3xl border border-border bg-background-elevated p-0 text-foreground backdrop:bg-black/70 sm:inset-0 sm:m-auto sm:max-h-[85dvh] sm:max-w-lg sm:rounded-3xl"
      >
        {current && (
          <div className="px-6 pb-10 pt-3 sm:px-8 sm:pt-6">
            {/* スマホでは、上に「つまみ」を出す(下から出てきた紙だと分かるように) */}
            <div aria-hidden="true" className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/15 sm:hidden" />

            <div className="flex items-start gap-4">
              <Icon src={current.icon} size={84} />
              <div className="min-w-0 flex-1 pt-1">
                <h2 className="text-xl font-black leading-snug text-foreground">
                  {current.name}
                </h2>
                {current.subName && (
                  <p className="mt-0.5 text-sm font-bold text-muted">{current.subName}</p>
                )}
                <p className="mt-1.5 text-xs font-bold leading-relaxed text-pink-light">
                  {current.eyebrow}
                </p>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="閉じる"
                className="-mr-2 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-muted transition-colors hover:bg-white/10 hover:text-foreground"
              >
                ×
              </button>
            </div>

            {/* ゲームも道具も全画面で動くので、新しいタブで開く */}
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-full bg-pink py-3.5 text-center text-base font-bold text-white shadow-[0_0_30px_rgba(255,46,136,0.35)] transition-transform active:scale-[0.98]"
            >
              {action}
            </a>
            {current.devices && (
              <p className="mt-2.5 text-center text-xs tracking-wider text-muted">
                {current.devices}
              </p>
            )}

            {current.cover && (
              <Image
                src={current.cover}
                alt={current.coverAlt ?? ""}
                width={1280}
                height={720}
                sizes="(min-width: 640px) 512px, 100vw"
                className="mt-6 aspect-video w-full rounded-2xl border border-border object-cover"
              />
            )}

            <p className="mt-6 text-sm leading-loose text-muted">{current.description}</p>

            <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
              {current.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </dialog>
    </>
  );
}
