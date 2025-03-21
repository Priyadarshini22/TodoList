import { useEffect, useState } from 'react';

function App() {
  const [task, setTask] = useState({
    id: 0,
    name: "",
    completed: false,
    isEditable: false,
  });
  const [tasks, setTasks] = useState([]);
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [filteredTask, setFilteredTask] = useState(tasks);

  useEffect(() => {
    filterCheck();
}, [term, filter, tasks]);

const filterCheck = () => {
  let filtered = tasks;
  if (filter === "Completed") {
    filtered = tasks.filter((item) => item.completed);
  } else if (filter === "InProgress") {
    filtered = tasks.filter((item) => !item.completed);
  }
  if (term !== "") {
    filtered = filtered.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()));
  }
  setFilteredTask(filtered);
};


  const editName = (name, id) => {
    setTasks(tasks.map((c) => {
      if (c.id === id) {
        return { ...c, name: name };
      }
      return c;
    }));
  };

  const addTask = () => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  };

  const editTask = (id) => {
    setTasks(tasks.map((item) => {
      if (item.id === id) {
        return { ...item, isEditable: true };
      }
      return item;
    }));
  };

  const handleCompleted = (id) => {
    setTasks(tasks.map((item) => {
      if (item.id === id) {
        return { ...item, completed: true, isEditable:false };
      }
      return item;
    }));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <div className="main">
      <div className="search">
        <input type="text" onChange={(e) => setTerm(e.target.value)} />
        <select name="filters" onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="InProgress">In Progress</option>
        </select>
        <button onClick={() => addTask(task)} id="add">Add</button>
      </div>
      {filteredTask.map((item, index) =>
        <div key={index} className="task-card">
          <div className="task-content">
            {!item.isEditable ? <p>{item.name}</p> :
              <input type="text" value={item.name} onChange={(e) => editName(e.target.value, item.id)} />}
          </div>
          <div className="task-actions">
            <button onClick={() => editTask(item.id)}>Edit</button>
            <button onClick={() => handleCompleted(item.id)}>Done</button>
            <button onClick={() => removeTask(item.id)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
