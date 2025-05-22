type Props = {
  step: number;
  total: number;
};

export default function ProgressBar({ step, total }: Props) {
  const percent = (step / total) * 100;

  return (
    <div className="w-full max-w-xl mt-6">
      <div className="bg-gray-300 h-2 rounded-full">
        <div
          className="bg-green-500 h-2 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="text-sm text-center mt-1 text-gray-600">
        {Math.round(percent)}%
      </p>
    </div>
  );
}
