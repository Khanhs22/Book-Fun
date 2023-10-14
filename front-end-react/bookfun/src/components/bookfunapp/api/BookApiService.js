import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080/books'
    }
)


export function findAllBooksApi() {
    return apiClient.get('');
}

export const deleteBookByIdApi
        = (theBookId) => apiClient.delete(`${theBookId}`)

export const findBookByIdApi
        = (theBookId) => apiClient.get(`${theBookId}`)

export const updateBookByIdApi
        = (theBookId, book) => apiClient.put(`${theBookId}`, book)

export const addBookApi
        = (book) => apiClient.post('', book)

export const addReviewApi
        = (theBookId, review) => apiClient.post(`${theBookId}`, review)