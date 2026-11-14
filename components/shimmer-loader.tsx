"use client";

import { useEffect, useState } from "react";

// Module-level flag: resets on a full page reload, persists across
// client-side navigation, so the overlay plays once per page load.
let hasShownOnce = false;

/**
 * ShimmerLoader
 * 1. Shows a page-shaped skeleton (nav, hero text, product image, CTA button)
 *    on first load, then fades it out once the page has finished loading.
 * 2. Adds a shimmer to every <img> and <video> (in its own shape) until
 *    that media has loaded. Works for images/videos in every component,
 *    including ones that mount later (modals, lazy images).
 *
 * It never touches your content or logic.
 */
export function ShimmerLoader() {
  const [visible, setVisible] = useState(!hasShownOnce);
  const [leaving, setLeaving] = useState(false);

  // ---- 1. First-load skeleton overlay ----
  useEffect(() => {
    if (hasShownOnce) return;

    let fadeTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // no scrolling behind overlay

    const hide = () => {
      hasShownOnce = true;
      document.body.style.overflow = previousOverflow;
      setLeaving(true);
      fadeTimer = setTimeout(() => setVisible(false), 500);
    };

    const maxWait = setTimeout(hide, 4000); // never block longer than 4s

    const onLoad = () => {
      clearTimeout(maxWait);
      hideTimer = setTimeout(hide, 250);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      clearTimeout(maxWait);
      clearTimeout(hideTimer);
      clearTimeout(fadeTimer);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // ---- 2. Per-image / per-video shimmer ----
  useEffect(() => {
    const track = (el: HTMLImageElement | HTMLVideoElement) => {
      if (el.dataset.shimmerTracked) return;
      el.dataset.shimmerTracked = "1";

      const isImg = el instanceof HTMLImageElement;
      const alreadyLoaded = isImg
        ? el.complete && el.naturalWidth > 0
        : (el as HTMLVideoElement).readyState >= 2;
      if (alreadyLoaded) return;

      el.setAttribute("data-shimmer", "loading");
      const clear = () => el.removeAttribute("data-shimmer");
      el.addEventListener(isImg ? "load" : "loadeddata", clear, {
        once: true,
      });
      el.addEventListener("error", clear, { once: true });
    };

    const scan = () =>
      document
        .querySelectorAll<HTMLImageElement | HTMLVideoElement>("img, video")
        .forEach(track);

    scan();
    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-background overflow-hidden flex flex-col transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Navigation bar */}
      <div className="flex items-center justify-between px-4 md:px-8 h-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="shimmer w-10 h-10 rounded-full" />
          <div className="shimmer w-28 h-5 rounded-full" />
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="shimmer w-16 h-4 rounded-full" />
          <div className="shimmer w-16 h-4 rounded-full" />
          <div className="shimmer w-16 h-4 rounded-full" />
          <div className="shimmer w-24 h-10 rounded-full" />
        </div>
        <div className="md:hidden shimmer w-10 h-10 rounded-xl" />
      </div>

      {/* Hero (vertically centred like the real hero) */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        {/* Brand title + taglines */}
        <div className="shimmer w-72 h-12 md:w-[34rem] md:h-16 rounded-2xl mb-4" />
        <div className="shimmer w-40 h-6 md:w-56 md:h-7 rounded-full mb-3" />
        <div className="shimmer w-32 h-5 md:w-44 rounded-full" />

        {/* Product image */}
        <div className="shimmer w-64 h-64 md:w-80 md:h-80 rounded-3xl my-8 md:my-12" />

        {/* ORDER NOW button + caption */}
        <div className="shimmer w-56 h-16 md:w-72 md:h-24 rounded-full" />
        <div className="shimmer w-48 h-4 md:w-64 rounded-full mt-6" />
      </div>
    </div>
  );
}
