import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ImageUploader from 'react-images-upload';

class Home extends Component {

	constructor(props){
		super(props);

	}

	componentDidMount(){
		console.log('componentDidMount');
	}

	componentDidUpdate(){
		console.log('componentDidUpdate');
	}

	render() {
		return (
            <>
                <h4>home</h4>
				<ImageUploader
					withIcon={true}
					buttonText='Choose images'
					onChange={this.onDrop}
					imgExtension={['.jpg', '.gif', '.png', '.gif']}
					maxFileSize={5242880}
					withPreview={true}
					fileSizeError='File size is too Big.' 
					singleImage={true}
				/>
            </>			
		);
	}	
}

export default Home;
