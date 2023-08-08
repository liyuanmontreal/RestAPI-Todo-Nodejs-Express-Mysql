module.exports = app => {
  const tasks = require("../controllers/task.controller.js");

  var router = require("express").Router();

  // Create a new Task
  router.post("/", tasks.create);

  // Retrieve all Tutorials
  router.get("/", tasks.findAll);

  // Retrieve all unfinished Tasks
  router.get("/unfinished", tasks.findAllUnfinished);

  // Retrieve a single Task with id
  router.get("/:id", tasks.findOne);

  // Update a Task with id
  router.put("/:id", tasks.update);

  // Delete a Task with id
  router.delete("/:id", tasks.delete);

  // Delete all Tutorials
  router.delete("/", tasks.deleteAll);

  app.use('/tasks', router);
};