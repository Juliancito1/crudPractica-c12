import type { Tarea } from "../types/types";
import { TareaCard } from "./TareaCard";

interface Props {
  tareas: Tarea[];
  editar: (tarea: Tarea) => void;
  eliminar: (id: number) => void;
}

export const TareasContainer = ({ tareas, editar, eliminar }: Props) => {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Mis tareas ({tareas.length})
      </h2>

      {tareas.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-center text-gray-500">
          No hay tareas cargadas.
        </p>
      ) : (
        tareas.map((tarea) => (
          <TareaCard
            key={tarea.id}
            tarea={tarea}
            editar={editar}
            eliminar={eliminar}
          />
        ))
      )}
    </section>
  );
};
