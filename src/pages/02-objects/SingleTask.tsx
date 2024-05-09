import { IoReorderThreeOutline } from "react-icons/io5";
import { Task } from "../../interfaces/task.type";
import { useTaskStore } from "../../stores/tasks/task.store";

type SingleTaskProps = {
  task: Task;
};

export const SingleTask = ({ task }: SingleTaskProps) => {
  const setDraggingTaskId = useTaskStore((state) => state.setDraggingTaskId);
  const removeDraggingTaskId = useTaskStore((state) => state.removeDraggingTaskId);

  return (
    <div
      draggable
      onDragStart={() => setDraggingTaskId(task.id)}
      onDragEnd={() => removeDraggingTaskId()}
      className="flex items-center justify-between p-2 mt-5"
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{task.title}</p>
      </div>
      <span className="w-6 h-6 cursor-pointer text-navy-700">
        <IoReorderThreeOutline />
      </span>
    </div>
  );
};
