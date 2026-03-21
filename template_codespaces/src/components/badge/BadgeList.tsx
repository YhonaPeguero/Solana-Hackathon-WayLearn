import { type BadgeWithPda } from "../../types/repulink";
import { BadgeCard } from "./BadgeCard";

interface BadgeListProps {
  badges: BadgeWithPda[];
  onShare?: (badge: BadgeWithPda) => void;
  isLoading?: boolean;
}

export function BadgeList({ badges, onShare, isLoading }: BadgeListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-2xl border border-border-low bg-card"
          />
        ))}
      </div>
    );
  }

  if (badges.length === 0) {
    return (
      <div className="rounded-2xl border border-border-low bg-card p-10 text-center">
        <p className="text-sm text-muted">No badges yet.</p>
        <p className="mt-1 text-xs text-muted">
          Create your first badge to start building your reputation.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {badges.map((badge) => (
        <BadgeCard
          key={badge.pda}
          badge={badge}
          onShare={onShare}
        />
      ))}
    </div>
  );
}