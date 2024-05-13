import { v4 as UUID } from "uuid";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Task, TaskStatus } from "../../interfaces/task.type";

type TaskState = {
  tasks: Record<string, Task>;
  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
};

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
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

  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: UUID(), title, status };

    // muted state with immer
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    // // muted state native zustand, spread operator
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   },
    // }));
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    // muted state with immer
    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status,
      };
    });

    // // muted state native zustand, spread operator
    // const task = get().tasks[taskId];
    // task.status = status;

    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task,
    //   },
    // }));
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

export const useTaskStore = create<TaskState>()(devtools(immer(storeApi)));
