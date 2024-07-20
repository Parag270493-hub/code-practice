import { useEffect, useState } from "react";

interface TaskFormProps {
    onAddTask: (name: string, description: string, assignee: string) => void;
    isEditing: boolean;
    task: any;
    onUpdateTask: any;
}

const TaskForm = ({ task, onAddTask, onUpdateTask, isEditing }: TaskFormProps) => {
    const [name, setName] = useState(task ? task.name : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [assignee, setAssignee] = useState(task ? task.assignee : '');

    useEffect(() => {
        if (task) {
            setName(task.name);
            setDescription(task.description);
            setAssignee(task.assignee)
        }
    }, [task]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            onUpdateTask(name, description, assignee);
        } else {
            onAddTask(name, description, assignee);
        }
        setName('');
        setDescription('');
        setAssignee('');
    }
    const isButtonDisabled: boolean = name.trim() === '' || description.trim() === '' || assignee.trim() === '';
    return (
        <div className="flex justify-center">

            <div className=" h-96">
                <h2 className="py-3 text-center text-lg ">Details of Task</h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="" className="block text-gray-600">Task Name :</label>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 p-2 w-full block rounded-md" />
                    </div>
                    <div className="py-4 space-y-2">
                        <label htmlFor="" className="block text-gray-600">Task Description :</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-300 p-2 w-full block rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="" className="block text-gray-600">Assignee :</label>
                        <input type="text"
                            value={assignee}
                            onChange={(e) => setAssignee(e.target.value)}
                            className="border border-gray-300 p-2 w-full block rounded-md" />
                    </div>
                    <div className="flex justify-center pt-3">
                        <button type="submit"
                            onClick={handleSubmit}
                            className={`bg-white rounded-md p-2 font-semibold border border-gray-300 ${isButtonDisabled ? "cursor-not-allowed opacity-50 text-gray-600" : "bg-white hover:bg-gray-300 "}`}
                            disabled={isButtonDisabled}   >
                            Add Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskForm