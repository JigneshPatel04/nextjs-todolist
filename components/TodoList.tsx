import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Modal,
} from "react-bootstrap";
import "./TodoList.module.css";

const TodoList = () => {
  const [todos, setTodos] = useState([
    "Learn React",
    "Build a React app",
    "Deploy React app to production",
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editedTodo, setEditedTodo] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (editIndex === -1) {
      if (!newTodo.trim()) {
        alert("Please enter a todo item");
        return;
      }
      // Add new todo
      setTodos([...todos, newTodo]);
    } else {
      // Edit existing todo
      if (!editedTodo.trim()) {
        alert("Please enter a todo item");
        return;
      }
      if (window.confirm("Are you sure you want to save changes?")) {
        const newTodos = [...todos];
        newTodos[editIndex] = editedTodo;
        setTodos(newTodos);
        setEditIndex(-1);
        setEditedTodo("");
      }
    }
    setNewTodo("");
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const newTodos = todos.filter((todo, i) => i !== deleteIndex);
    setTodos(newTodos);
    setShowDeleteModal(false);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedTodo(todos[index]);
    setNewTodo("");
  };

  return (
    <Container className="my-4">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center mb-4">Todo List</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="newTodo">
              <Form.Label>Add Todo</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button variant="primary" type="submit">
                    {editIndex === -1 ? "Add" : "Save"}
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
          <hr className="hr-style" />
          <ListGroup className="mt-4">
            {todos.map((todo, index) => (
              <ListGroup.Item key={index}>
                <div className="d-flex justify-content-between align-items-center">
                  {editIndex === index ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group controlId="editedTodo">
                        <Row className="d-flex">
                          <Col>
                            <Form.Control
                              type="text"
                              value={editedTodo}
                              onChange={(e) => setEditedTodo(e.target.value)}
                              style={{ width: "320px" }}
                            />
                          </Col>
                          <Col xs="auto" className="ms-2">
                            <Button variant="primary" type="submit">
                              Save
                            </Button>
                          </Col>
                          <Col xs="auto" className="">
                            <Button
                              variant="secondary"
                              onClick={() => setEditIndex(-1)}
                            >
                              Cancel
                            </Button>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Form>
                  ) : (
                    <>
                      <div>{todo}</div>
                      <div>
                        <Button
                          variant="danger"
                          size="sm"
                          className="mx-2"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="info"
                          size="sm"
                          className="mx-1"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
