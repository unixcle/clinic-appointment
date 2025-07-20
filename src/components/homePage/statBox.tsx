import StatCounter from "../../hooks/statCounter";


interface StatBoxProps {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
}

export default function StatBox({ end, suffix = "", duration = 2, label }: StatBoxProps) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-blue-700">
        <StatCounter end={end} duration={duration} suffix={suffix} />
      </p>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}