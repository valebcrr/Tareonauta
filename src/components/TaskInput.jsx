import { useState } from "react";
import { Plus } from "lucide-react";

function TaskInput({ addTask }) {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    addTask(text);
    setText("");
    setIsOpen(false); 
  };

  return (
    <div className="mb-4">
      {!isOpen ? (
        //Botón agregar
        <button onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-100 transition"
        >
          <Plus size={18} />
          Agregar tarea
        </button>
      ) : (
        //Input 
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input type="text"  placeholder="Escribe tu tarea..." value={text} onChange={(e) => setText(e.target.value)}
            autoFocus className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button type="submit" className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600">
            Agregar
          </button>

          <button type="button" onClick={() => setIsOpen(false)} className="px-3 rounded-lg bg-gray-200 hover:bg-gray-300">
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}

export default TaskInput;