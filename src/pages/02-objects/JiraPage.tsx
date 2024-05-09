import { JiraTasks } from "../../components";

export const JiraPage = () => {
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <JiraTasks title="Pendientes" value="pending" />

        <JiraTasks title="Avanzando" value="in-progress" />

        <JiraTasks title="Terminadas" value="done" />
      </div>
    </>
  );
};
