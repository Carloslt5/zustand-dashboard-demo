import clsx from "clsx";
import { IoAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { useTasks } from "../../hooks/useTasks";
import { Task, TaskStatus } from "../../interfaces/task.type";
import { SingleTask } from "../../pages/02-objects/SingleTask";

interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export const JiraTasks = ({ title, tasks, status }: Props) => {
  const { isDragging, onDragOver, handleAddTask, handleDragOver, handleDragLeave, handleDrop } =
    useTasks({ status });

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={clsx(
        "border-2 !text-black relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px] transition-all",
        {
          "border-blue-500 border-dotted": isDragging,
          "border-green-500 border-dotted": isDragging && onDragOver,
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row flex-wrap justify-between gap-2">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center justify-center bg-indigo-100 rounded-full h-9 w-9">
            <span className="flex items-center justify-center w-6 h-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="w-full h-full">
        {tasks.map((task) => (
          <SingleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
