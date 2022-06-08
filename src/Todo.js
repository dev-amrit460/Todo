import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const Todo = ({
  id,
  title,
  detail,
  lastDate,
  completeTodo,
  editTodo,
  deleteTodo,
}) => {
  const [show, setShow] = useState(false);

  const [newTitle, setTitle] = useState(title);
  const [newDetail, setDetail] = useState(detail);
  const [newlastDate, setLastDate] = useState(lastDate);

  const handleClose = () => {
    setShow(false);
    setTitle(title);
    setDetail(detail);
    setLastDate(lastDate);
  };

  const handleShow = () => setShow(true);

  const editTodoHandler = (title, detail, lastDate) => {
    handleClose();
    const todo = {
      id,
      title,
      detail,
      lastDate,
    };

    editTodo(todo);
    setTitle(title);
    setDetail(detail);
    setLastDate(lastDate);
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
          <h5>{title}</h5>
          <p>{detail}</p>
          <p>{`Last date : ${lastDate}`}</p>
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

            <Form.Group controlId="detail">
              <Form.Label>Detail</Form.Label>
              <Form.Control
                type="text"
                value={newDetail}
                onChange={(e) => setDetail(e.target.value)}
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
            onClick={() => editTodoHandler(newTitle, newDetail)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Todo;
