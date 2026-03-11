"use client";

import { useMemo } from "react";
import { getHistory, clearHistory } from "@/lib/storage";
import { StoredSession } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HistoryPanelProps {
  onReuse: (session: StoredSession) => void;
}

export function HistoryPanel({ onReuse }: HistoryPanelProps) {
  const history = useMemo(() => getHistory(), []);

  if (history.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Dernieres generations</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => {
          clearHistory();
          window.location.reload();
        }}>
          Vider
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {history.slice(0, 5).map((session) => (
          <button
            key={session.id}
            type="button"
            onClick={() => onReuse(session)}
            className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted"
          >
            <p className="line-clamp-2 text-sm text-foreground">{session.input}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {new Date(session.createdAt).toLocaleString("fr-FR")}
            </p>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
