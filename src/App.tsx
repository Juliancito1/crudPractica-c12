import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
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
      void Swal.fire({
        icon: "success",
        title: "Tarea actualizada",
        text: `"${data.titulo}" se guardó correctamente.`,
        timer: 1800,
        showConfirmButton: false,
      });
      setTareaEditar(null);
      return;
    }

    const nuevaTarea: Tarea = {
      id: Date.now(),
      titulo: data.titulo,
      descripcion: data.descripcion,
    };
    setTareas((actuales) => [...actuales, nuevaTarea]);
    void Swal.fire({
      icon: "success",
      title: "Tarea creada",
      text: `"${data.titulo}" se agregó correctamente.`,
      timer: 1800,
      showConfirmButton: false,
    });
  };

  // TODO 2: Implementar READ
  // Mostrar las tareas utilizando map()

  // TODO 3: Implementar UPDATE
  const editarTarea = (tarea: Tarea) => {
    setTareaEditar(tarea);
  };

  // TODO 4: Implementar DELETE
  const eliminarTarea = async (id: number) => {
    const resultado = await Swal.fire({
      title: "¿Eliminar esta tarea?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!resultado.isConfirmed) return;

    setTareas((actuales) => actuales.filter((tarea) => tarea.id !== id));
    void Swal.fire({
      icon: "success",
      title: "Tarea eliminada",
      timer: 1800,
      showConfirmButton: false,
    });
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
          key={tareaEditar?.id ?? "nueva"}
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
