import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Image, FaceBox, ObjectBox, Caption } from "../../components";
import {
  facesRecognition,
  describeImage,
  detectObjects,
  nsfw,
  recognitionReset
} from "../../store/actions/recognition";

import styles from "./ImageRecognition.scss";

class ImageRecognition extends Component {
  state = {
    formData: undefined,
    imageUrl: undefined,
    recognitionType: undefined,
    error: null
  };

  setRecognitionType = buttonInfo => {
    this.setState({ recognitionType: buttonInfo });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    switch (this.state.recognitionType) {
      case "describe":
        return this.props.describe(this.state.formData);
      case "faces":
        return this.props.locateFaces(this.state.formData);
      case "objects":
        return this.props.detectObjects(this.state.formData);
      case "nsfw":
        return this.props.nsfwClassify(this.state.formData);
      default:
        return "No valid actions selected";
    }
  };

  onChangeHandler = e => {
    e.preventDefault();
    this.props.recognitionData ? this.props.resetRecognitionData() : null;
    const image = e.target.files[0];
    if (image.type === "image/jpeg" || image.type === "image/png") {
      this.setState({ imageUrl: URL.createObjectURL(image), error: null });
      const fd = new FormData();
      fd.append("image", image, image.name);
      this.setState({ formData: fd });
    } else {
      this.setState({
        formData: undefined,
        imageUrl: undefined,
        recognitionType: undefined,
        error: "Only jpg or png file accepted"
      });
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <p className={styles.description}>
          Submit an image to get a caption, find all faces, check NSFW or find
          objects.
        </p>
        <form encType="multipart/form-data" onSubmit={this.onSubmitHandler}>
          <input
            accept="image/x-png,image/jpeg"
            style={{ display: "none" }}
            onChange={this.onChangeHandler}
            name="file"
            type="file"
            ref={fileInput => (this.fileInput = fileInput)}
          />
          <div className={styles["select-image-button-container"]}>
            <Button
              variant="extendedFab"
              size="large"
              color="primary"
              type="button"
              onClick={() => this.fileInput.click()}
            >
              Select a picture
            </Button>
          </div>
          {this.state.error ? (
            <div style={{ color: "red" }}>{this.state.error}</div>
          ) : null}

          <Button
            disabled={!this.state.imageUrl}
            variant="outlined"
            size="small"
            color="primary"
            name="describe"
            type="submit"
            onClick={() => {
              this.props.resetRecognitionData();
              this.setRecognitionType("describe");
            }}
          >
            Get Caption
          </Button>
          <Button
            disabled={!this.state.imageUrl}
            variant="outlined"
            size="small"
            color="primary"
            name="faces"
            type="submit"
            onClick={() => {
              this.props.resetRecognitionData();
              this.setRecognitionType("faces");
            }}
          >
            Detect Faces
          </Button>
          <Button
            disabled={!this.state.imageUrl}
            variant="outlined"
            size="small"
            color="primary"
            name="objects"
            type="submit"
            onClick={() => {
              this.props.resetRecognitionData();
              this.setRecognitionType("objects");
            }}
          >
            Detect Objects
          </Button>
          <Button
            disabled={!this.state.imageUrl}
            variant="outlined"
            size="small"
            color="primary"
            name="nsfw"
            type="submit"
            onClick={() => {
              this.props.resetRecognitionData();
              this.setRecognitionType("nsfw");
            }}
          >
            Check NSFW
          </Button>
        </form>
        {this.props.recognitionData? <Caption type={this.state.recognitionType} data={this.props.recognitionData}></Caption>:null}
        {this.state.imageUrl ? (
          <Image imageUrl={this.state.imageUrl}>
            {this.props.recognitionData &&
            this.state.recognitionType === "faces" ? (
                <FaceBox data={this.props.recognitionData.Faces} />
            ) : null}

            {this.props.recognitionData &&
            this.state.recognitionType === "objects" ? (
                <ObjectBox
                  data={this.props.recognitionData.Objects}
                  objectsNumber={this.props.recognitionData.Objects.ObjectCount}
                />
            ) : null}
          </Image>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recognitionSuccess: state.recognition.success,
    recognitionData: state.recognition.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    locateFaces: formData => dispatch(facesRecognition(formData)),
    describe: formData => dispatch(describeImage(formData)),
    detectObjects: formData => dispatch(detectObjects(formData)),
    nsfwClassify: formData => dispatch(nsfw(formData)),
    resetRecognitionData: () => dispatch(recognitionReset())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageRecognition);
