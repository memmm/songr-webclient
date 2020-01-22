import Button from "react-bootstrap/Button";
import { uploadImage } from "../store/actions/userActions";

export default class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      if (this.state.file != '')
      uploadImage(this.state.file);
      console.log('uploading ', this.state.file);
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
      const types = ['image/png', 'image/jpeg', 'image/gif']
  
      reader.onloadend = () => {
        // if (types.every(type => file.type !== type)) {
        //     this.setState({ imagePreviewUrl:`'${file.type}' is not a supported format`})
        
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
    
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        // $imagePreview = (<div className="previewText">Upload an image for preview!</div>);
      }
  
      return (
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
          <label htmlFor="file-upload" className="custom-file-upload">
             Choose an image
        </label>
            <input className="fileInput" 
              id="file-upload"
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
            <div className="img-preview mt-4">
                {$imagePreview}
            </div>
            <Button className="submitButton w-100 mt-4" variant="outline-secondary"
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}><i className="fa fa-upload"></i> Upload Image</Button>
          </form>
          
        </div>
      )
    }
  }