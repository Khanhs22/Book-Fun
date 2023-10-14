import { useState } from "react"
import { retrieveHelloWorld } from "./api/retrieveHelloWorldBean"

export default function HelloWorld() {

    const [message, setMessage] = useState('')

    function callHelloWorldRestApi() {
        
        retrieveHelloWorld()
        .then( (response) => setMessage(response.data))
        .catch( (error) => console.log(error))
        .finally( () => console.log("done"))
    }

    return (
        <div>
            HelloWorld!
            <button onClick={callHelloWorldRestApi}>Called Hello</button>
            <div>
                {message}
            </div>
        </div>
    )
}