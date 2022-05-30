import React from "react";
import { ref } from "firebase/storage";
import { storage } from "../firebase";

class FirebaseTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {image: null};
    }

    handleUpload = event => {
        event.preventDefault();
    }

    handleChange = event => {
        this.setState({
            image: event.target.files[0]
        });
    }

    render() {
        return <div>
            <form>
                <label htmlFor="image">Choose Files
                    <input type="file" id="image" onChange={this.handleChange}/>
                </label>
                <button onClick={this.handleUpload}>
                </button>
            </form>
        </div>
    }

}

export default FirebaseTest;