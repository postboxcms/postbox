import React from "react";
import { useDropzone } from "react-dropzone";
import { useCSS } from "../../hooks/css";
import { useNotifier } from "../../hooks/notifications";
import { site } from "../../utils/constants";

const ImageUploader = ({ uploadImage, placeholder }) => {
    console.log(placeholder);
    const classes = useCSS();
    const [placeholderText, setPlaceholderText] = React.useState(
        placeholder ? <img width="200px" src={`${site.url}/images/${placeholder}`} /> : "Drag 'n' drop any image here, or click to select one"
    );
    const notify = useNotifier();
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: {
            "image/*": [],
        },
        multiple: false,
        onDrop: (files) => {
            if (files.length <= 0) {
                return notify("File is not a valid image", "error");
            }
            console.log(files);
            uploadImage(files[0]);
            setPlaceholderText(files[0].name);
        },
    });
    return (
        <section className={classes.draggable}>
            <div {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
                <input {...getInputProps()} />
                <p>{placeholderText}</p>
            </div>
        </section>
    );
};

export default ImageUploader;
