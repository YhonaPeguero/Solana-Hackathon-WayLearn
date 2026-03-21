import { getBadgeStatusLabel, type BadgeStatus } from "../../types/repulink";

interface StatusBadgeProps {
  status: BadgeStatus;
}

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Approved: "bg-green-100 text-green-800 border-green-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = getBadgeStatusLabel(status);

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles[label]}`}
    >
      {label}
    </span>
  );
}