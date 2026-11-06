import { useEffect, useState } from "react";
import type { Tarea, TareaFormData } from "./types/types";
import { TareaForm } from "./components/TareaForm";
import { TareasContainer } from "./components/TareasContainer";

const TAREAS_STORAGE_KEY = "crudPracticaC12:tareas";

function App() {
  const [tareas, setTareas] = useState<Tarea[]>(() => {
    const tareasGuardadas = localStorage.getItem(TAREAS_STORAGE_KEY);
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  const [tareaEditar, setTareaEditar] = useState<Tarea | null>(null);

  useEffect(() => {
    localStorage.setItem(TAREAS_STORAGE_KEY, JSON.stringify(tareas));
  }, [tareas]);

  // CREATE y UPDATE
  // TODO 1: Implementar CREATE
  const guardarTarea = (data: TareaFormData) => {
    if (tareaEditar) {
      setTareas((actuales) =>
        actuales.map((tarea) =>
          tarea.id === tareaEditar.id ? { ...tarea, ...data } : tarea,
        ),
      );
      setTareaEditar(null);
      return;
    }

    const nuevaTarea: Tarea = {
      id: Date.now(),
      titulo: data.titulo,
      descripcion: data.descripcion,
    };
    setTareas((actuales) => [...actuales, nuevaTarea]);
  };

  // TODO 2: Implementar READ
  // Mostrar las tareas utilizando map()

  // TODO 3: Implementar UPDATE
  const editarTarea = (tarea: Tarea) => {
    setTareaEditar(tarea);
  };

  // TODO 4: Implementar DELETE
  const eliminarTarea = (id: number) => {
    // Completar
    setTareas((actuales) => actuales.filter((tarea) => tarea.id !== id));
  };

  // Cancelar edición
  const cancelarEdicion = () => {
    setTareaEditar(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-600">
            Lista de tareas
          </h1>

          <p className="mt-2 text-gray-600">Organizá tus actividades</p>
        </header>

        <TareaForm
          onGuardar={guardarTarea}
          tareaEditar={tareaEditar}
          cancelarEdicion={cancelarEdicion}
        />

        <TareasContainer
          tareas={tareas}
          editar={editarTarea}
          eliminar={eliminarTarea}
        />
      </div>
    </main>
  );
}

export default App;
