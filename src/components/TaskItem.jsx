import { useState, useEffect } from "react";
import { Pencil, Trash2, Save, Check } from "lucide-react";

function TaskItem({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  useEffect(() => {
    setNewText(task.text);
  }, [task.text]);

  const handleEdit = () => {
    if (!newText.trim()) return;

    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      
      {isEditing ? (
        <div className="flex items-center w-full gap-2">
          <input value={newText} onChange={(e) => setNewText(e.target.value)}
            className="flex-1 px-3 py-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button onClick={handleEdit} title="Guardar cambios" className="text-green-500 hover:scale-110 transition">
            <Save size={20} />
          </button>
        </div>
      ) : (
        <>
          {/* Checkbox */}
          <button
            onClick={() => toggleTask(task.id)} title="Marcar como completada"
            className={`w-5 h-5 flex items-center justify-center rounded-full border-2 mr-3 cursor-pointer transition-all duration-300 ${
              task.completed
                ? "bg-green-500 border-green-500 scale-110 shadow"
                : "border-gray-400 hover:border-gray-600"
            }`}
          >
            <Check size={14}
              className={`text-white transition-all duration-300 ${
                task.completed
                  ? "scale-100 opacity-100"
                  : "scale-0 opacity-0"
              }`}
            />
          </button>

          {/* Texto */}
          <span
            className={`flex-1 transition-all duration-300 ${
              task.completed
                ? "text-gray-400 opacity-70"
                : "text-gray-800"
            }`}
          >
            {task.text}
          </span>

          {/* Acciones */}
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} title="Editar tarea" 
              className="text-yellow-500 hover:scale-110 transition"
            >
              <Pencil size={20} />
            </button>

            <button onClick={() => deleteTask(task.id)} title="Eliminar tarea"
              className="text-red-500 hover:scale-110 transition"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;