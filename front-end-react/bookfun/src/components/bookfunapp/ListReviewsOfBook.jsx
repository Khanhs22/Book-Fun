import { useEffect, useState } from "react"
import { addReviewApi, findBookByIdApi } from "./api/BookApiService"
import { useNavigate, useParams } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik } from "formik"

export default function ListReviewsOfBook() {

    const {theBookId} = useParams()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [reviews, setReviews] = useState([])

    const [context] = useState('')

    useEffect( () => refreshBook(), [theBookId] )


    function refreshBook() {

        findBookByIdApi(theBookId)
        .then(response => {
            console.log(response.data.reviews)
            setName(response.data.name)
            setReviews(response.data.reviews)
        })
        .catch(error => console.log(error))  
    }

    function onSubmit(values) {

        console.log(values)

        const review = {
            context: values.context,
        }

        values.context = ''

        addReviewApi(theBookId, review)
        .then(
            () => {                
                refreshBook()
                navigate(`/books/${theBookId}/reviews`)
            }
        )
        .catch( (error) => console.log(error))
    }

    function validate(values) {
        
        let errors = {
        }

        if (values.context.length < 5) {
            errors.context = 'Enter atleast 5 characters in name field'
        }

        console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1 className="m-5">All Reviews of {name}</h1>
            
            <div>
            {
                reviews.map(
                    review => (
                        <div key={review.id}>
                            <h4 className="text-start" name="review-date">{review.dateTime}</h4>
                            <p className="fs-1 text-start shadow p-3 mb-5 bg-body rounded text-break" name="review">{review.context}</p>
                            <hr />
                        </div>
                    )
                )
            }
            </div>
            <br /><br /><br />
            <div>
                <Formik
                    initialValues={ {context} }
                    onSubmit={onSubmit}
                    validate={validate}
                    enableReinitialize = {true}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                    >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name='context'
                                component='div'
                                className='alert alert-warning'
                            />
                            <fieldset className="form-group">
                                <Field as="textarea" type="text" className="form-control" name="context" placeholder="Add new review"></Field>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Add</button>
                            </div>
                        </Form>
                    )        
                }                   
                </Formik>
            </div>
        </div>
    )
}