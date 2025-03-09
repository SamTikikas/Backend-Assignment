const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "Task.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/tasks/", async (req, res) => {
  const task1 = await db.all("SELECT * FROM task");

  res.send(todos.map(formatTodo));
});

app.get("/tasks/:taskId/", async (req, res) => {
  const { todoId } = req.params;
  const task2 = await db.get("SELECT * FROM task WHERE id = ?", [todoId]);
  res.send(formatTodo(task2));
});

app.post("/tasks/", async (req, res) => {
  const { id } = req.body;

  await db.run(
    "INSERT INTO todo (id, task, status,) VALUES (?, ?, ?, ?, ?, ?)",
    [id, task, priority, status]
  );
  res.send("Todo Successfully Added");
});

app.put("/tasks/:taskId/", async (req, res) => {
  const { todoId } = req.params;
  const {} = req.body;
  await db.run(
    "UPDATE todo SET task = ?, priority = ?, status = ? WHERE id = ?",
    [task, priority, status, todoId]
  );
  res.send("Todo updated successfully");
});

app.delete("/task/:taskId/", async (req, res) => {
  const { todoId } = req.params;
  await db.run("DELETE FROM todo WHERE id = ?", [todoId]);
  res.send("Todo Deleted");
});

module.exports = app;
