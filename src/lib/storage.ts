import { StoredSession, StorageData } from "@/types";

const STORAGE_KEY = "popbio_data";

export function getStorageData(): StorageData {
  if (typeof window === "undefined") {
    return { history: [], settings: { theme: "dark" } };
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }

  return { history: [], settings: { theme: "dark" } };
}

export function saveStorageData(data: StorageData): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function addToHistory(session: StoredSession): void {
  const data = getStorageData();
  data.history.unshift(session);

  if (data.history.length > 50) {
    data.history = data.history.slice(0, 50);
  }

  saveStorageData(data);
}

export function getHistory(): StoredSession[] {
  return getStorageData().history;
}

export function clearHistory(): void {
  const data = getStorageData();
  data.history = [];
  saveStorageData(data);
}

export function getTheme(): "dark" | "light" {
  return getStorageData().settings.theme;
}

export function setTheme(theme: "dark" | "light"): void {
  const data = getStorageData();
  data.settings.theme = theme;
  saveStorageData(data);
}
