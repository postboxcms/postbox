import React from "react";
import { useDropzone } from "react-dropzone";
import { useCSS, useNotifier } from "@app/hooks";
import { site } from "@app/utils";

const ImageUploader = ({ uploadImage, placeholder, name }) => {
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
            uploadImage(files[0]);
            setPlaceholderText(files[0].name);
        },
    });

    React.useEffect(() => {
        console.log("updated");
        if (placeholder) {
            setPlaceholderText(<img width="200px" src={`${site.url}${placeholder}`} />);
        }
    }, [placeholder]);

    return (
        <section className={classes.draggable}>
            <div {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
                <input name={name} {...getInputProps()} />
                <p>{placeholderText}</p>
            </div>
        </section>
    );
};

export default ImageUploader;
