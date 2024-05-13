import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { TaskStatus } from "../interfaces/task.type";
import { useTaskStore } from "../stores/tasks/task.store";

type useTasksOptions = {
  status: TaskStatus;
};

export const useTasks = ({ status }: useTasksOptions) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "New Task",
      input: "text",
      inputLabel: "Task name",
      inputPlaceholder: "Add new task",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Uou need to add a title for the task";
        }
      },
    });
    if (!isConfirmed) return;
    addTask(value, status);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };
  return { isDragging, onDragOver, handleAddTask, handleDragOver, handleDragLeave, handleDrop };
};
