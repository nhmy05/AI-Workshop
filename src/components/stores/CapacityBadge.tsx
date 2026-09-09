import { getCapacityLevel, getCapacityColor } from "@/lib/capacity";

type CapacityBadgeProps = {
  percent: number;
  size?: "sm" | "md";
};

export default function CapacityBadge({ percent, size = "sm" }: CapacityBadgeProps) {
  const level = getCapacityLevel(percent);
  const color = getCapacityColor(level);
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${sizeClasses}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
      aria-label={`Capacity: ${percent}%`}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      {percent}%
    </span>
  );
}
