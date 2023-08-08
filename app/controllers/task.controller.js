const Task = require("../models/task.model.js");

// Create and Save a new Task
// Postman setting : post http://localhost:8080/tasks
// send Jason type data to test
// {
//   "content" :"buy milk",
//   "finished": false
// }
// response:
// {
//   "id": 1,
//   "content": "buy milk",
//   "finished": false
// }
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: " Request content can not be empty!"
      });
    }
  
    // Create a Task
    const task = new Task({
      content: req.body.content,     
      finished: req.body.finished || false
    });
  
    // Save Task in the database
    Task.create(task, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Task."
        });
      else res.send(data);
    });
  };

// Retrieve all Tasks from the database (with condition).
// ALL-Postman setting: get http://localhost:8080/tasks/
// Search - Postman setting: get http://localhost:8080/tasks/?content=milk
exports.findAll = (req, res) => {
    const content = req.query.content;
  
    Task.getAll(content, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tasks."
        });
      else res.send(data);
    });
  };
  

// Get all unfinished tasks
// url : http://localhost:8080/tasks/unfinished
// Postman setting:  http://localhost:8080/tasks/unfinished
  exports.findAllUnfinished = (req, res) => {
    Task.getAllUnfinished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tasks."
        });
      else res.send(data);
    });
  };

// Find a single Task with a id
// url : http://localhost:8080/tasks/:id
// Postman setting:  http://localhost:8080/tasks/1
exports.findOne = (req, res) => {
  Task.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Task with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Task with id " + req.params.id
        });
      }
    } else res.send(data);
  });  
};



// // find all published Tutorials
// exports.findAllPublished = (req, res) => {
  
// };

// Update a Task identified by the id in the request
// URL http://localhost:8080/tasks/:id
// Postman setting: PUT http://localhost:8080/tasks/1
// send data
// {
//   "content" :"go to library",
//   "finished": false
// }
// receive
// {
//     "id": "1",
//     "content": "go to library",
//     "finished": false
// }
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Request content can not be empty!"
    });
  }
  // console.log(req.body);

  Task.updateById(
    req.params.id,
    new Task(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Task with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Task with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Task with the specified id in the request
// routes DELETE /tasks/:id
// Postman setting: delete http://localhost:8080/tasks/3
// receive data:
// {
//   "message": "Task was deleted successfully!"
// }
exports.delete = (req, res) => {
  Task.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Task with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Task with id " + req.params.id
        });
      }
    } else res.send({ message: `Task was deleted successfully!` });
  });
};

// Delete all Tasks from the database.
// routes DELETE /tasks
// Postman setting: delete http://localhost:8080/tasks/
// receive data:
// {
//   "message": "All Tasks were deleted successfully!"
// }
 exports.deleteAll = (req, res) => {
  Task.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tasks."
      });
    else res.send({ message: `All Tasks were deleted successfully!` });
  });
 };