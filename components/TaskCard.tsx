interface TaskCardProps {
  title: string;
  due: string;
  completed: boolean;
  onDelete: () => void;
  onToggle: () => void;
}

export default function TaskCard({
  title,
  due,
  completed,
  onDelete,
  onToggle,
}: TaskCardProps) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="w-4 h-4"
        />

        <div>
          {/* Apply line-through and muted color when completed */}
          <h3 className={`font-medium ${completed ? "line-through text-gray-500" : "text-white"}`}>
            {title}
          </h3>
          <p className={`text-sm ${completed ? "text-gray-600" : "text-gray-400"}`}>
            Due: {due}
          </p>
        </div>
      </div>

      <button onClick={onDelete} className="text-red-400 hover:text-red-600 font-semibold">
        Delete
      </button>
    </div>
  );
}
