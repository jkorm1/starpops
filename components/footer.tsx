"use client";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Music } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="flex items-center gap-3">
            {/* Added rounded-full, object-cover, and forced square dimensions */}
            <img
              src="/logo.jpg"
              alt="Starpops Logo"
              className="h-10 w-10 rounded-full object-cover border border-yellow-500/50"
            />
            <div className="text-2xl font-bold glow-text-gold tracking-tighter">
              STARPOPS
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#products"
                  className="hover:text-primary transition-colors"
                >
                  Classic
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-primary transition-colors"
                >
                  Pink Edition
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-primary transition-colors"
                >
                  Elite
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#story"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="hover:text-primary transition-colors"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.instagram.com/starpops1/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={40}
                  height={40}
                />
              </Link>
              <Link
                href="https://www.snapchat.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/snapchat.png"
                  alt="Snapchat"
                  width={40}
                  height={40}
                />
              </Link>
              <Link
                href="https://www.tiktok.com/@starpops_1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image src="/tiktok.png" alt="TikTok" width={40} height={40} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Starpops. All rights reserved. Crafted with
            magic and popcorn.
          </p>
        </div>
      </div>
    </footer>
  );
}
