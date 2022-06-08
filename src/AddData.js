import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const AddData = ({ addData }) => {
	const [Title, setTitle] = useState('')
	const [Description, setDescription] = useState('')
    const [Date, setDate] = useState()

	const handleSubmit = e => {
		e.preventDefault()
		addData({
			Title,
			Description,
			Date,
			Email: 'abc@hb.com',
			Completed: false,  
		})
	}

	return (
		<Form>
			<Form.Group controlId='title'>
			  <Form.Label>Title</Form.Label>
			  <Form.Control type='text' placeholder='Enter Title' onChange={e => setTitle(e.target.value)} />
			</Form.Group>

			<Form.Group controlId='Description'>
			  <Form.Label>Description</Form.Label>
			  <Form.Control type='text' placeholder='Enter Description' onChange={e => setDescription(e.target.value)} />
			</Form.Group>

            <Form.Group controlId='lastDate'>
			  <Form.Label>Last Date</Form.Label>
			  <Form.Control type='date' placeholder='Enter Last Date' onChange={e => setDate(e.target.value)} />
			</Form.Group>

			<Button variant='success' type='submit' onClick={handleSubmit}>Add Task</Button>
		</Form>
	)
}

export default AddData