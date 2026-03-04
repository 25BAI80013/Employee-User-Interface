import { useState, useEffect } from "react";

function App() {
  const API_URL = "http://localhost:5000/employees";

  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    position: ""
  });

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add new employee
  const addEmployee = async () => {
    if (!form.id || !form.name || !form.position) {
      alert("Please fill all fields");
      return;
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      setForm({ id: "", name: "", position: "" });
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Management System</h2>

      <input
        placeholder="ID"
        value={form.id}
        onChange={(e) => setForm({ ...form, id: e.target.value })}
      />

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Position"
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
      />

      <button onClick={addEmployee} style={{ marginLeft: 10 }}>
        Add
      </button>

      <hr />

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.position}
            <button
              style={{
                marginLeft: 10,
                background: "red",
                color: "white"
              }}
              onClick={() => deleteEmployee(emp.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;