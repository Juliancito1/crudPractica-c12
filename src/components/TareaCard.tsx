import type { Tarea } from "../types/types";

interface Props {
  tarea: Tarea;
  editar: (tarea: Tarea) => void;
  eliminar: (id: number) => void;
}

export const TareaCard = ({ tarea, editar, eliminar }: Props) => {
  return (
    <article className="mb-4 flex flex-col justify-between gap-4 rounded-xl bg-white p-5 shadow sm:flex-row sm:items-center">
      <div>
        <h3 className="text-lg font-bold text-gray-800">{tarea.titulo}</h3>

        <p className="mt-1 text-gray-600">{tarea.descripcion}</p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => editar(tarea)}
          className="rounded-lg bg-amber-500 px-3 py-2 text-white hover:bg-amber-600"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => eliminar(tarea.id)}
          className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};
