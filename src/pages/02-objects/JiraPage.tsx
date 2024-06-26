import { JiraTasks } from "../../components";
import { TaskStatus } from "../../interfaces/task.type";
import { useTaskStore } from "../../stores/tasks/task.store";

export const JiraPage = () => {
  const openTask = useTaskStore((state) => state.getTaskByStatus(TaskStatus.OPEN));
  const inProgressTask = useTaskStore((state) => state.getTaskByStatus(TaskStatus.IN_PROGRESS));
  const doneTask = useTaskStore((state) => state.getTaskByStatus(TaskStatus.DONE));

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <JiraTasks title="Open" status={TaskStatus.OPEN} tasks={openTask} />

        <JiraTasks title="In Progress" status={TaskStatus.IN_PROGRESS} tasks={inProgressTask} />

        <JiraTasks title="Done" status={TaskStatus.DONE} tasks={doneTask} />
      </div>
    </>
  );
};
