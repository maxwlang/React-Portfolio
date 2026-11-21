"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCopy,
  faDownload,
  faKey,
  faTerminal,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  pgpAlgorithm,
  pgpCreated,
  pgpExpires,
  pgpFingerprint,
  pgpKeyPath,
  pgpPublicKey,
  pgpUserId,
} from "@/data/pgpKey";

const SCRAMBLE_GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const SCRAMBLE_DURATION_MS = 1400;
const importCommand = `curl -sL https://maxwlang.com${pgpKeyPath} | gpg --import`;

const placeholderKey = pgpPublicKey.replace(/\S/g, "·");

const ScrambledKey: React.FC = () => {
  const [display, setDisplay] = useState(placeholderKey);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Each character resolves at its own point, drifting left to right per line
    let column = 0;
    const thresholds = Array.from(pgpPublicKey, (char) => {
      column = char === "\n" ? 0 : column + 1;
      return (column / 64) * 0.35 + Math.random() * 0.65;
    });
    let frame = 0;
    let start: number | undefined;

    const tick = (now: number) => {
      start ??= now;
      const progress = reduceMotion
        ? 1
        : Math.min((now - start) / SCRAMBLE_DURATION_MS, 1);

      let next = "";
      for (let i = 0; i < pgpPublicKey.length; i++) {
        const char = pgpPublicKey[i];
        next +=
          /\s/.test(char) || progress >= thresholds[i]
            ? char
            : SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0];
      }
      setDisplay(next);

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <pre
      aria-label="PGP public key block"
      className="font-mono text-[11px] leading-[1.15rem] sm:text-xs sm:leading-5 text-emerald-300/90 whitespace-pre select-all"
    >
      {display}
    </pre>
  );
};

const useCopy = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return { copied, copy };
};

const Fingerprint: React.FC = () => {
  const groups = pgpFingerprint.split(/\s+/);
  // The last four groups are the long key ID
  const keyIdStart = groups.length - 4;

  return (
    <div className="grid grid-cols-5 gap-x-2 gap-y-1 font-mono text-sm sm:text-base tracking-wider">
      {groups.map((group, i) => (
        <span
          key={i}
          className={
            i >= keyIdStart
              ? "text-emerald-300 font-semibold drop-shadow-[0_0_6px_rgba(110,231,183,0.6)]"
              : "text-slate-400"
          }
        >
          {group}
        </span>
      ))}
    </div>
  );
};

interface PgpKeyModalProps {
  open: boolean;
  onClose: () => void;
}

const PgpKeyModal: React.FC<PgpKeyModalProps> = ({ open, onClose }) => {
  const { copied, copy } = useCopy();

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <DialogPanel className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-emerald-400/20 bg-slate-950 text-slate-200 shadow-[0_0_60px_-10px_rgba(16,185,129,0.35)]">
                {/* Window chrome */}
                <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-4 py-3">
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="group h-3 w-3 rounded-full bg-red-500 flex items-center justify-center"
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-[8px] text-red-950 opacity-0 group-hover:opacity-100"
                    />
                  </button>
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-3 font-mono text-xs text-slate-500">
                    ~/maxwlang.asc
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/40">
                      <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping [animation-iteration-count:2]" />
                      <FontAwesomeIcon
                        icon={faKey}
                        className="text-emerald-300 text-lg"
                      />
                    </div>
                    <div className="min-w-0">
                      <DialogTitle
                        as="h3"
                        className="text-2xl font-bold text-white"
                      >
                        PGP Public Key
                      </DialogTitle>
                      <p className="text-sm text-slate-400 truncate">
                        {pgpUserId}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px] text-slate-400">
                        <span className="rounded border border-slate-700 px-1.5 py-0.5">
                          {pgpAlgorithm}
                        </span>
                        <span className="rounded border border-slate-700 px-1.5 py-0.5">
                          created {pgpCreated}
                        </span>
                        <span className="rounded border border-slate-700 px-1.5 py-0.5">
                          expires {pgpExpires}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fingerprint */}
                  <div className="mt-6">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                      Fingerprint
                    </p>
                    <Fingerprint />
                  </div>

                  {/* Key block */}
                  <div className="relative mt-6 rounded-lg border border-slate-800 bg-black/60">
                    <div className="max-h-64 overflow-auto p-4">
                      <ScrambledKey />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* Import command */}
                  <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 font-mono text-xs">
                    <FontAwesomeIcon
                      icon={faTerminal}
                      className="text-emerald-400 shrink-0"
                    />
                    <code className="flex-1 overflow-x-auto whitespace-nowrap text-slate-300">
                      {importCommand}
                    </code>
                    <button
                      onClick={() => copy("command", importCommand)}
                      aria-label="Copy import command"
                      className="shrink-0 text-slate-500 hover:text-emerald-300 transition-colors"
                    >
                      <FontAwesomeIcon
                        icon={copied === "command" ? faCheck : faCopy}
                      />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => copy("key", pgpPublicKey)}
                      className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] focus:outline-none focus:ring focus:ring-emerald-300"
                    >
                      <FontAwesomeIcon
                        icon={copied === "key" ? faCheck : faCopy}
                      />
                      {copied === "key" ? "Copied!" : "Copy key"}
                    </button>
                    <a
                      href={pgpKeyPath}
                      download="maxwlang.asc"
                      className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-emerald-400/60 hover:text-emerald-300 focus:outline-none focus:ring focus:ring-slate-500"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                      Download .asc
                    </a>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PgpKeyModal;
