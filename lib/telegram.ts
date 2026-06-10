"use client";

import { useEffect, useState } from "react";

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  is_premium?: boolean;
}

export interface TelegramWebApp {
  initDataUnsafe: {
    user?: TelegramUser;
    start_param?: string;
  };
  ready(): void;
  expand(): void;
  disableVerticalSwipes?(): void;
  requestFullscreen?(): void;
}

function getTelegramUser(): TelegramUser | null {
  if (typeof window === "undefined") return null;
  const tg = (window as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp;
  return tg?.initDataUnsafe?.user ?? null;
}

export function useTelegramUser(): TelegramUser | null {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const tg = (window as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.disableVerticalSwipes?.();
    }
    setUser(getTelegramUser());
  }, []);

  return user;
}

export function getInitials(user: TelegramUser | null, fallback = "TG"): string {
  if (!user) return fallback;
  const parts = [user.first_name, user.last_name].filter(Boolean);
  return parts
    .map((p) => p!.trim()[0].toUpperCase())
    .slice(0, 2)
    .join("") || fallback;
}

export function getDisplayName(user: TelegramUser | null, fallback = "Telegram User"): string {
  if (!user) return fallback;
  return [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || fallback;
}
