import { Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

/**
 * Componente principal de la aplicación
 * manejo de las rutas de las vistas/componentes
 */
function App() {
  return (
    <Routes>
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/task/new" element={<TaskForm />} />
      <Route path="/task/:id" element={<TaskForm />} />
      <Route path="/" element={<TaskList />} />
      <Route path="/task" element={<TaskList />} />
    </Routes>
  );
}

export default App;
