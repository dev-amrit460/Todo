import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const AddData = ({ addData }) => {
	const [title, setTitle] = useState('')
	const [detail, setDetail] = useState('')
    const [lastDate, setLastDate] = useState(new Date())

	const handleSubmit = e => {
		e.preventDefault()
		addData({
			title,
			detail,
			done: false,
            lastDate,
		})
	}

	return (
		<Form>
			<Form.Group controlId='title'>
			  <Form.Label>Title</Form.Label>
			  <Form.Control type='text' placeholder='Enter Title' onChange={e => setTitle(e.target.value)} />
			</Form.Group>

			<Form.Group controlId='detail'>
			  <Form.Label>Detail</Form.Label>
			  <Form.Control type='text' placeholder='Enter Detail' onChange={e => setDetail(e.target.value)} />
			</Form.Group>

            <Form.Group controlId='lastDate'>
			  <Form.Label>Last Date</Form.Label>
			  <Form.Control type='date' placeholder='Enter Last Date' onChange={e => setLastDate(e.target.value)} />
			</Form.Group>

			<Button variant='success' type='submit' onClick={handleSubmit}>Add Task</Button>
		</Form>
	)
}

export default AddData