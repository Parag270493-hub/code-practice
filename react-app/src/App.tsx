import React, { useState } from 'react';
import TaskForm from './component/taskForm';
import './style/tailwind.css';
import TaskList, { Task } from './component/taskList';

function App() {
  const [task, setTask] = useState<Task[]>([])
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const handleAddTask = (name: string, description: string, assignee: string) => {
    const newTask: Task = { name, description, assignee };
    setTask([...task, newTask])
  }
  const handleDeleteTask = (index: number) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);
  };
  const handleEditTask = (index: any) => {
    setEditingIndex(index);
    setIsEditing(true);
  }

  const handleUpdateTask = (name: string, description: string, assignee: string) => {
    const updatedTasks = task && task.map((task: Task, index: number) => index === editingIndex ? { name, description, assignee } : task);
    setTask(updatedTasks);
    setIsEditing(false);
    setEditingIndex(null);
  }
  const handleReorderTasks = (updatedTasks: any) => {
    setTask(updatedTasks);
  };
  return (
    <>
      <TaskForm
        task={isEditing && editingIndex !== null ? task[editingIndex] : undefined}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        isEditing={isEditing}
      />
      <div className='my-20'>
        <TaskList
          task={task}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onReorderTasks={handleReorderTasks}
        />
      </div>
    </>
  );
}

export default App;
