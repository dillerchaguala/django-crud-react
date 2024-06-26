import React from "react";
import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  console.log("Task Card Data:", task);

  return (
    <div
      style={{
        background: "bg-blue-800 p-3 hover:bg-blue-700 hover:cursor-pointer",
        padding: "10px",
        margin: "10px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <h1 className="Font-bold uppercase">{task.title}</h1>
      <p className=" text-slate-400 ">{task.description}</p>
      <hr />
    </div>
  );
}
