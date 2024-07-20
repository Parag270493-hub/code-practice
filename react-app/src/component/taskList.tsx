import { useState } from "react";

export interface Task {
    name: string;
    description: string;
    assignee: string;
}

export interface TaskListProps {
    task: Task[];
    onDeleteTask: (index: number) => void;
    onEditTask: (index: number) => void;
    onReorderTasks: (updatedTasks: Task[]) => void;
}

const TaskList = ({ task, onDeleteTask, onEditTask, onReorderTasks }: TaskListProps) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleDrop = (index: number) => {
        if (draggedIndex === null) return;

        const updatedTasks = [...task];
        const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
        updatedTasks.splice(index, 0, draggedTask);

        onReorderTasks(updatedTasks);
        setDraggedIndex(null);
    };
    return (
        <>
            <div className="container mx-auto">
                <div className="bg-white shadow-md rounded my-6">
                    <div className="grid grid-cols-5 p-2 border-t text-center">
                        <div className="font-bold">Sr.no</div>
                        <div className="font-bold">Task Name</div>
                        <div className="font-bold">Task Description</div>
                        <div className="font-bold">Assignee</div>
                        <div className="font-bold">Action</div>
                    </div>
                    {
                        task && task.map((task: Task, index: number) => (
                            <div className="grid grid-cols-5 p-2 border-t text-center" key={index}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={() => handleDrop(index)}
                            >
                                <div>{index + 1}</div>
                                <div>{task.name}</div>
                                <div>{task.description}</div>
                                <div>{task.assignee}</div>
                                <div className="px-2 space-x-4">
                                    <button
                                        onClick={() => onDeleteTask(index)}
                                        className="bg-white text-gray-900 rounded-md p-2 font-semibold border border-gray-300 hover:bg-gray-300">
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => onEditTask(index)}
                                        className="bg-white text-gray-900 rounded-md p-2 font-semibold border border-gray-300 hover:bg-gray-300">
                                        Edit
                                    </button>

                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default TaskList