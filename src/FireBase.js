import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import firebase from 'firebase';
import Img from 'react-image';
import Home from './Home';

class FireBase extends Component {

	constructor(props){
		super(props);

		this.state = {
			postDetail: '',
			isLoading: 0,
			title_value: '',
			content_value: '',
			postId: '',
			isSaved: false,
			pictures: [],
			imgSrc: './images/img-placeholder.png',
			updatePost: false,
			isPublished: true
		}

		//this.state1 = { isSaved: false }

		this.handleTitleVal = this.handleTitleVal.bind(this);
		this.handleContentVal = this.handleContentVal.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.handlePublished = this.handlePublished.bind(this);
	}

	onDrop(img) {
        this.setState({
			pictures: this.state.pictures.concat(img),
		});
    }

	componentDidMount(){
		//root for your database
		// const rootRef = firebase.database().ref().child('react');
		// const speedRef = rootRef.child('speed');
		// speedRef.on('value', snap => {
		// 	this.setState({
		// 		speed: snap.val()
		// 	});
		// });

		
		
		//console.log('test '+speedRef);

		// speedRef.on('value', snap => {
		// 	this.setState({
		// 		speed: snap.val()
		// 	});
		// });
		// /this.PostDetails()
		//console.log('component '+this.PostDetails())
		//this.PostDetails();
		//this.PostDetails();
	}

	componentWillMount(){	
		console.log('componentWillMount');
		this.PostDetails();
	}

	componentDidUpdate(){
		console.log('componentDidUpdate');
	}
	

	PostDetails = () =>{
		//let rootRef = firebase.database().ref();
		const rootRef = firebase.database().ref().child('post');
		const speedRef = rootRef.child('post');
		rootRef.on('value', snap => {	
			let val = snap.val();
			
			this.setState({
				isLoading: 1,
				postDetail: val,
			})
		})		
	} 

	tableDetails = () => {
		let isLoading = this.state.isLoading;
		let tableDetail;
		let tableD = this.state.postDetail;

		if(isLoading === 0){	
			tableDetail = <div class="spinner-border"></div>;
		}else{
			tableDetail = tableD.map((value, i) => 
				<tr key={i}>
					<td>{i+1}</td>
					<td><Img src={require(''+value.img_path+'')} style={{width:'75px', height:'50px'}}/></td>
					<td>{value.title}</td>
					<td>{value.content}</td>
					<td>
						<button onClick={(e) => this.editPost(i,e)} className="btn btn-info btn-sm mr-1">edit</button>
						<button onClick={(e) => this.removePost(i,e)} className="btn btn-danger btn-sm mr-1">remove</button>
					</td>
				</tr>
			);
		}

		return tableDetail;
	}

	handleTitleVal(event) {
		this.setState({
			title_value: event.target.value,
		});
	}

	handleContentVal(event) {
		this.setState({
			content_value: event.target.value,
		});
	}

	handlePublished(event) {
		const target = event.target;
    	const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
			[name]: value,
		});
	}

	removePost = (id,e) => {
		firebase.database().ref('post/'+ id).remove()
	}

	editPost = (i,e) => {
		let tableD = this.state.postDetail;

		this.setState({ postId : tableD[i].id }) 
		this.setState({ title_value : tableD[i].title }) 
		this.setState({ content_value : tableD[i].content }) 

		this.setState({ updatePost : true }) 
		this.setState({ imgSrc: tableD[i].img_path })
	}

	submitForm(e) {
		e.preventDefault();

		let postId = this.state.postId;
		let tableD = this.state.postDetail;
		const title = this.state.title_value;
		const content = this.state.content_value;
		const author = 'Pando Crowbarjones';
		const dateToday = new Date();
		const isPublished = this.state.isPublished;
		const file = this.state.pictures;
		let postData = {};
		let paramId;
		let published;

		let timeDateToday = dateToday.toDateString() + ' ' + dateToday.toLocaleTimeString()

		/* To increment the ID */
		let id = tableD.length - 1;
		id += 1;
		/* */

		/* To get the last push image in the array */
		let image_path = './images/'+file[file.length - 1].name;
		/* */

		if(isPublished === true){
			published = 1;
		}else{
			published = 0;
		}

		if(Number.isInteger(postId)){
			postData = {
				id: postId,
				title: title,
				content: content,
				img_path: image_path,
				author: author,
				date: timeDateToday,
				published : published
			};
			paramId = postId;	
		}else{
			postData = {
				id: id,
				title: title,
				content: content,
				img_path: image_path,
				author: author,
				date: timeDateToday,
				published : published
			};
			paramId = id;
		}

		// var newPostKey = firebase.database().ref().child('react').push().key;
		//updates['/post/' + paramId] = postData;
		firebase.database().ref('post/' + paramId).update(postData, 
			(error) => {
			if (error) {
				console.log('failed');
			} else {
				console.log('Saved successfully!');
				this.resetForm(e)

				this.setState({ isSaved: true });
				this.setState({ updatePost: false })
			}
		});
	}

	resetForm = (e) => {
		e.preventDefault(); 

		this.setState({
			title_value: '',
			content_value: '',
			postId: ''
		});
	}

	imageUploader = () => {
		const isSaved = this.state.isSaved;
		let ImgUploader;

		if(isSaved === false){
			ImgUploader = <ImageUploader
				withIcon={true}
				buttonText='Choose images'
				onChange={this.onDrop}
				imgExtension={['.jpg', '.gif', '.png', '.gif']}
				maxFileSize={5242880}
				withPreview={true}
				fileSizeError='File size is too Big.' 
				singleImage={true}
			/>	
		}else{
			ImgUploader = <ImageUploader
				withIcon={true}
				buttonText='Choose images'
				onChange={this.onDrop}
				imgExtension={['.jpg', '.gif', '.png', '.gif']}
				maxFileSize={5242880}
				withPreview={true}
				fileSizeError='File size is too Big.' 
				singleImage={true}
				defaultImages= {[]}
			/>	

			setTimeout(
				() => this.setState({ isSaved: false }),
				1000
			);
		}

		return ImgUploader;
	}

	render() {
		let tableDetails = this.tableDetails();

		let updatePost = this.state.updatePost;
		let prevImg;

		if(updatePost === true){
			prevImg = 
			<div className="form-group">
				<h3>Photos</h3>
				<img src={require(''+this.state.imgSrc+'')} style={{width:'100px', height:'100px'}}/>
			</div>
		}

		console.log(this.state.postDetail);

		// console.log(typeof this.state.postDetail)
		// fetch('https://api.thecatapi.com/v1/images')
		// .then(response => response.json())
		// .then(json => console.log(json))

		// fetch('https://reactjs-test-a2133.firebaseio.com/react.json', {
		// 	method: 'POST',
		// 	body: JSON.stringify({
		// 		name: 'foo',
		// 		email: 'bar',
		// 		id: 67
		// 	}),
		// 	// headers: {
		// 	// 	"Content-type": "application/json; charset=UTF-8"
		// 	// }
		// })
		// .then(response => response.json())
		// .then(json => console.log(json))

		/* For Adding Value to Database*/
		// let id = 4;
		// var postData = {
		// 	id: id,
		// 	name: 'foo',
		// 	email: 'bar'
		// };

		// var newPostKey = firebase.database().ref().child('react').push().key;
		// var updates = {};
		// updates['/react/' + id] = postData;
		// firebase.database().ref().update(updates);

		/* For Deleting Value to Database */
		//firebase.database().ref('react/'+ 4).remove()

		/* Updating the data */
		// let id = 4;
		// var postData = {
		// 	id: id,
		// 	name: 'foo1',
		// 	email: 'bar1'
		// };
		

		return (
            <>
				<form onSubmit={(e) => { this.submitForm(e) }}>
					<div className="form-group">
                    <label htmlFor="name" className="text-left">Title:</label>
                    	<input type="text" className="form-control" name="title_value" value={this.state.title_value}  onChange={this.handleTitleVal} />
                    </div>
					<div className="form-group">
                    <label htmlFor="name"  className="text-left">Content:</label>
                    	{/* <input type="text" className="form-control" name="post_value" value={this.state.content_value} onChange={this.handleContentVal} /> */}
						<textarea className="form-control" name="post_value" value={this.state.content_value} onChange={this.handleContentVal} />
					</div>
					<div className="form-group">
						{this.imageUploader()}
					</div>
					{prevImg}
					<div className="form-group">
						<input name="isPublished" type="checkbox" checked={this.state.isPublished} onChange={this.handlePublished} /> Published
					</div>
					<button type="submit" className="btn btn-success">Post</button>
				</form>
				<br />
				<table className="table table-striped">
		 			<thead>
		 				<tr>
		 					<th>#</th>
							<th>Img</th>
		 					<th>Title</th>
		 					<th>Content</th>
							<th>Action</th>
		 				</tr>
		 			</thead>
		 			<tbody>		
		 				{tableDetails}
		 			</tbody>
		 		</table>
            </>			
		);
	}	
}

export default FireBase;
