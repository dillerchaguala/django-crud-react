import { useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { createTasks, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function FormuPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Tarea Actulizada", {
        position: "bottom-righ",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTasks(data);
      toast.success("Tarea Actulizada", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/tasks");

    try {
      await createTasks(data);
      navigate("/tasks");
      reset();
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        console.log("Obteniendo datos");
        const {
          data: { title, description },
        } = await getTask(params.id);
        setValue("title", title);
        setValue("description", description);
      }
    }
    loadTask();
  }, [params.id, getTask, setValue]);

  const handleDelete = async () => {
    const accepted = window.confirm("¿Estás seguro de eliminar esta tarea?");
    if (accepted) {
      try {
        await deleteTask(params.id);
        toast.success("Tarea Eliminada", {
          position: "bottom-righ",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
        navigate("/tasks");
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2>Crear Nueva Tarea</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.title && (
            <span style={{ color: "red" }}>Este Título es requerido</span>
          )}
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            rows="3"
            {...register("description", { required: true })}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          />
          {errors.description && (
            <span style={{ color: "red" }}>Esta Descripción es requerida</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"
        >
          Guardar
        </button>
      </form>

      {params.id && (
        <divi clasName="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={handleDelete}
          >
            Borrar
          </button>
        </divi>
      )}
    </div>
  );
}
