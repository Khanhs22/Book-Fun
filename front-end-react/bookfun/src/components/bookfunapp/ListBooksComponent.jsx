import { useEffect, useState } from "react"
import { deleteBookByIdApi, findAllBooksApi } from "./api/BookApiService"
import { useNavigate } from "react-router-dom"

export default function HelloWorld() {

    const [books, setBooks] = useState([])

    const [message, setMessage] = useState(null)

    const navigate = useNavigate()

    useEffect ( () => refreshBooks(), [] )

    function refreshBooks() {
        
        findAllBooksApi()
        .then( response => {
            setBooks(response.data)
        })
        .catch( error => console.log(error))
    }

    function deleteBook(theBookId) {
        
        deleteBookByIdApi(theBookId)
            .then(
                
                () => {
                    setMessage(`Delete of book with ${theBookId} successfull!`)
                    refreshBooks()
                }
            )
            .catch(error => console.log(error))
    }

    function reviewBook(theBookId) {
        navigate(`/books/${theBookId}/reviews`)
    }

    function updateBook(theBookId) {
        
        console.log('update!' + theBookId)
        navigate(`/book-details/${theBookId}`)
    }
    
    function addNewBook() {
        navigate(`/book-details/0`)
    }

    return (
        <div className="container">
            <h1>All Books</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Reviews</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        books.map(
                            book => (
                                <tr key={book.id}>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.description}</td>
                                    <td><button className="btn btn-primary" 
                                                    onClick={() => reviewBook(book.id)}>Review</button></td>
                                    <td><button className="btn btn-success" 
                                                    onClick={() => updateBook(book.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" 
                                                    onClick={() => deleteBook(book.id)}>Delete</button></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>

            <div className="btn btn-success m-5" onClick={addNewBook}>Add new book</div>
        </div>
    )
}