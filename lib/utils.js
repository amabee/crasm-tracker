import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateRandomString(length) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, length);
}

export function generateCredentials(fullName) {
  const names = fullName.toLowerCase().split(" ");
  const firstName = names[0];
  const lastName = names[names.length - 1];
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const username = `${firstName.charAt(0)}${lastName}${randomNum}`;

  const specialChars = "!@#$%^&*";
  const randomChar =
    specialChars[Math.floor(Math.random() * specialChars.length)];
  const randomDigit = Math.floor(Math.random() * 10);

  const basePassword = generateRandomString(10)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 10);

  const password = basePassword + randomDigit + randomChar;

  return { username, password };
}

export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export const formatDate = (dateString) => {
  if (!dateString) return null;

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return null;

  const options = {
    short: {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
    long: {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
    withTime: {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    },
  };

  return {
    short: date.toLocaleDateString("en-US", options.short),

    long: date.toLocaleDateString("en-US", options.long),

    withTime: date.toLocaleString("en-US", options.withTime),

    numeric: date.toLocaleDateString("en-US"),

    timeOnly: date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
  };
};

export const readableDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;

  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
