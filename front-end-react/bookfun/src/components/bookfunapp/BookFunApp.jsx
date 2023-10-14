import { BrowserRouter, Route, Routes } from "react-router-dom";
import HelloWorld from "./HelloWorld";
import ListBooksComponent from "./ListBooksComponent";
import BookComponent from "./BookComponent";
import ListReviewsOfBook from "./ListReviewsOfBook";

export default function BookFunApp() {
    return (
        <div className="BookFunApp">
            <BrowserRouter>
                    <Routes>
                        <Route path='/hello-world' element={<HelloWorld/>} />
                        <Route path='/' element={<ListBooksComponent/>} />
                        <Route path='/books' element={<ListBooksComponent/>} />
                        <Route path='/books/:theBookId/reviews' element={<ListReviewsOfBook/>} />
                        <Route path='/book-details/:theBookId' element={<BookComponent/>} />
                        
                    </Routes>
                </BrowserRouter>
        </div>
    )
}