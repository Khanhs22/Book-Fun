import { useNavigate, useParams } from "react-router-dom"
import { addBookApi, findBookByIdApi, updateBookByIdApi } from "./api/BookApiService"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"

export default function BookComponent() {

    const {theBookId} = useParams()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')

    useEffect( () => findBook(), [theBookId] )


    function findBook() {

        if (theBookId != 0) {

            findBookByIdApi(theBookId)
            .then(response => {
                setName(response.data.name)
                setAuthor(response.data.author)
                setDescription(response.data.description)
            })
            .catch(error => console.log(error))
        }    
    }

    function onSubmit(values) {

        console.log(values)
        const book = {
            id: theBookId,
            name: values.name,
            author: values.author,
            description: values.description
        }
        console.log(book)

        if (theBookId != 0) {

            updateBookByIdApi(theBookId, book)
            .then(
                () => (
                    navigate(`/books`)
                )
            )
            .catch(error => console.log(error))
        } else {

            addBookApi(book)
            .then(
                () => (
                    navigate(`/books`)
                )
            )
            .catch(error => console.log(error))
        }
    }

    function validate(values) {
        
        let errors = {
        }

        if (values.name.length < 3) {
            errors.name = 'Enter atleast 3 characters in name field'
        }

        if (values.author.length < 3) {
            errors.author = 'Enter atleast 3 characters in author field'
        }

        if (values.description.length < 7) {
            errors.description = 'Enter atleast 7 characters in description field'
        }

        // if (values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()) {
        //     errors.targetDate = 'Enter a target date'
        // }

        console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Book Title</h1>
            <div>
                <Formik initialValues={ {name, author, description} }
                    enableReinitialize = {true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name='name'
                                component='div'
                                className='alert alert-warning'
                            />

                            <ErrorMessage
                                name='author'
                                component='div'
                                className='alert alert-warning'
                            />

                            <ErrorMessage
                                name='description'
                                component='div'
                                className='alert alert-warning'
                            />

                            <fieldset className="form-group">
                                <label htmlFor="">Name</label>
                                <Field type="text" className="form-control" name="name"></Field>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="">Author</label>
                                <Field type="text" className="form-control" name="author"></Field>
                            </fieldset>
                            <fieldset className="form-group">
                                <label htmlFor="">Description</label>
                                <Field type="text" className="form-control" name="description"></Field>
                            </fieldset>

                            {/* <fieldset className="form-group">
                                <label htmlFor=""></label>
                                <Field type="date" className="form-control"></Field>
                            </fieldset> */}

                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>
    )
}