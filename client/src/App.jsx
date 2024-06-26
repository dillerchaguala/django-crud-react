import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TasksPage } from "./pages/TasksPage";
import { FormuPage } from "./pages/FormuPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks-create" element={<FormuPage />} />
          <Route path="/tasks/:id" element={<FormuPage />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}
export default App;
