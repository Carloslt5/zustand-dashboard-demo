import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { Task, TaskStatus } from "../../interfaces/task.type";

type TaskState = {
  tasks: Record<string, Task>;
  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
};

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: TaskStatus.OPEN },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: TaskStatus.IN_PROGRESS },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: TaskStatus.IN_PROGRESS },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: TaskStatus.DONE },
  },
  draggingTaskId: undefined,

  getTaskByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter((task) => task.status === status);
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    task.status = status;

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
