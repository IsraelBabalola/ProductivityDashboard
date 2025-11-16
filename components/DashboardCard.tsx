"use client";

interface DashboardCardProps {
  title: string;
  count: number | string;
  subtitle?: string;
  onClick: () => void;
}

export default function DashboardCard({ title, count, subtitle, onClick }: DashboardCardProps) {
  const emoji = title === "Tasks" ? "📝" : title === "Habits" ? "🔥" : "📒";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-4 bg-gray-900 rounded-xl border border-gray-700 hover:bg-gray-800 hover:scale-105 transition-transform shadow-md"
    >
      <h3 className="font-bold text-lg mb-2">{emoji} {title}</h3>
      <p className="text-2xl font-semibold mb-1">{count}</p>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
    </div>
  );
}
