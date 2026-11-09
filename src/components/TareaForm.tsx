import { useForm } from "react-hook-form";
import type { Tarea, TareaFormData } from "../types/types";

interface Props {
  onGuardar: (data: TareaFormData) => void;
  tareaEditar: Tarea | null;
  cancelarEdicion: () => void;
}

export const TareaForm = ({
  onGuardar,
  tareaEditar,
  cancelarEdicion,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TareaFormData>({
    defaultValues: {
      titulo: tareaEditar?.titulo ?? "",
      descripcion: tareaEditar?.descripcion ?? "",
    },
  });

  const enviarFormulario = (data: TareaFormData) => {
    onGuardar(data);
    reset({ titulo: "", descripcion: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(enviarFormulario)}
      className="mb-8 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="mb-5 text-xl font-bold text-gray-800">
        {tareaEditar ? "Editar tarea" : "Nueva tarea"}
      </h2>

      <div className="mb-4">
        <label className="mb-2 block font-medium">Título</label>

        <input
          {...register("titulo", {
            required: "El título es obligatorio",
            minLength: {
              value: 3,
              message: "Mínimo 3 caracteres",
            },
          })}
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-indigo-500"
          placeholder="Título de la tarea"
        />

        {errors.titulo && (
          <p className="mt-1 text-sm text-red-500">{errors.titulo.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block font-medium">Descripción</label>

        <textarea
          {...register("descripcion", {
            required: "La descripción es obligatoria",
            minLength: {
              value: 5,
              message: "Mínimo 5 caracteres",
            },
          })}
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-indigo-500"
          placeholder="Descripción de la tarea"
          rows={3}
        />

        {errors.descripcion && (
          <p className="mt-1 text-sm text-red-500">
            {errors.descripcion.message}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          {tareaEditar ? "Actualizar" : "Agregar tarea"}
        </button>

        {tareaEditar && (
          <button
            type="button"
            onClick={cancelarEdicion}
            className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
