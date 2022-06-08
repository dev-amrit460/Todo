import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const Todo = ({
  id,
  Title,
  Description,
  Date,
  completeTodo,
  editTodo,
  deleteTodo,
}) => {
  const [show, setShow] = useState(false);

  const [newTitle, setTitle] = useState(Title);
  const [newDescription, setDescription] = useState(Description);
  const [newlastDate, setLastDate] = useState(Date);
  // console.log(newlastDate);

  const handleClose = () => {
    setShow(false);
    setTitle(Title);
    setDescription(Description);
    setLastDate(Date);
  };

  const handleShow = () => setShow(true);

  const editTodoHandler = (Title, Description, Date) => {
    handleClose();
    const todo = {
      id,
      Title,
      Description,
      Date,
    };

    editTodo(todo);
    setTitle(Title);
    setDescription(Description);
    setLastDate(Date);
  };

  return (
    <>
      <div className=" card border-bottom my-3 p-3">
        <div
          style={{ display: `flex`, flexDirection: `row-reverse` }}
          className="tick p-2"
        >
          <span className="pl-2">
            <h6 style={{ height: `24px`, lineHeight: `24px` }}>Change State</h6>
          </span>
          <span style={{ width: `30px`, height: `24px` }}>
            <Form style={{ width: `30px`, height: `24px` }}>
              <input
                type="checkbox"
                onChange={() => completeTodo(id)}
                style={{ width: `30px`, height: `24px` }}
              />
            </Form>
          </span>
        </div>

        <div className="p-2">
          <br />
          <h5>{Title}</h5>
          <p>{Description}</p>
          <p>{`Last date : ${Date}`}</p>
        </div>

        <div className="twobtn">
          <Form>
            <div className="my-3 btn btn-secondary" onClick={handleShow}>
              Edit
            </div>
          </Form>

          <Form>
            <div className="my-3 btn btn-danger" onClick={() => deleteTodo(id)}>
              Delete
            </div>
          </Form>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newDescription}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="lastDate">
              <Form.Label>Last Date</Form.Label>
              <Form.Control
                type="date"
                value={newlastDate}
                onChange={(e) => setLastDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => editTodoHandler(newTitle, newDescription, newlastDate)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Todo;
