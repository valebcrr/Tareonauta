import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";

function App() {
  //Estado inicial desde localStorage
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  //Estado de filtro
  const [filter, setFilter] = useState("all");

  //Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Agregar tarea
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const editTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );

    setTasks(updatedTasks);
  };

  // Marcar como completada
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };

  //Eliminar tarea
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  //Filtrar tareas
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
  <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-300 flex items-center justify-center py-12">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl">
      <h1 className="text-4xl font-extrabold text-center text-indigo-600 tracking-wide">
        TAREONAUTA
      </h1>


      <p className="text-center text-sm text-gray-500 mb-4">
        {completedCount} de {totalCount} tareas completadas
      </p>

      <TaskInput addTask={addTask} />

      <div className="flex justify-between mt-4 mb-4">
        <button
          onClick={() => setFilter("all")}
          className="flex-1 mx-1 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Todas
        </button>

        <button
          onClick={() => setFilter("completed")}
          className="flex-1 mx-1 py-1 rounded-lg bg-green-200 hover:bg-green-300 transition"
        >
          Completadas
        </button>

        <button
          onClick={() => setFilter("pending")}
          className="flex-1 mx-1 py-1 rounded-lg bg-yellow-200 hover:bg-yellow-300 transition"
        >
          Pendientes
        </button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  </div>
);
}

export default App;