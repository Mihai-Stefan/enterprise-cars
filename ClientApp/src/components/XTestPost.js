import React from 'react';
import axios from 'axios';

class PutRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updatedAt: null,
            errorMessage: "No error message"
        };
    }

    componentDidMount() {
        // PUT request using axios with error handling
        const article = {
            id: 11,
            bodyType: 'ZZZ' };
        axios.put('https://localhost:44316/api/CarItems/11', article)
            .then(response => this.setState({ updatedAt: response.data.updatedAt }))
            .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
    }

    render() {
        const { errorMessage } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">PUT Request with Error Handling</h5>
                <div className="card-body">
                    Error: {errorMessage}
                </div>
            </div>
        );
    }
}

export { PutRequest }; 


//============

//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//function PutRequest() {
//    const [updatedAt, setUpdatedAt] = useState(null);

//    useEffect(() => {
//        // PUT request using axios inside useEffect React hook
//        const article = { title: 'React Hooks PUT Request Example' };
//        axios.put('https://reqres.in/api/articles/1', article)
//            .then(response => setUpdatedAt(response.data.updatedAt));

//        // empty dependency array means this effect will only run once (like componentDidMount in classes)
//    }, []);

//    return (
//        <div className="card text-center m-3">
//            <h5 className="card-header">PUT Request with React Hooks</h5>
//            <div className="card-body">
//                Returned Update Date: {updatedAt}
//            </div>
//        </div>
//    );
//}

//export { PutRequest };