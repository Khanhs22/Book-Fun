import axios from "axios";

// export default function retrieveHelloWorld() {

//     return (
//         axios.get('http://localhost:8080/books/hello-world')
//     )
// }

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080/books'
    }
)


export const retrieveHelloWorld
        = () => apiClient.get('/hello-world')