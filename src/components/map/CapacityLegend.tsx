import { getCapacityLevel, getCapacityColor } from "@/lib/capacity";

type CapacityLegendProps = {
  className?: string;
};

const levels = [
  { label: "0–35%", level: "green" as const, desc: "Low crowd" },
  { label: "36–60%", level: "yellow" as const, desc: "Moderate" },
  { label: "61–80%", level: "orange" as const, desc: "Busy" },
  { label: "81–100%", level: "red" as const, desc: "Very busy" },
];

export default function CapacityLegend({ className = "" }: CapacityLegendProps) {
  return (
    <div
      className={`bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 p-3 ${className}`}
      role="region"
      aria-label="Capacity legend"
    >
      <h3 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
        Capacity
      </h3>
      <div className="flex flex-col gap-1.5">
        {levels.map(({ label, level, desc }) => (
          <div key={level} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: getCapacityColor(level) }}
              aria-hidden="true"
            />
            <span className="text-xs text-gray-600">
              {label} — {desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
