import React from 'react';
import { Editor } from "@tinymce/tinymce-react";

export default function BoxEditor(props) {
    return (
        <Editor
            {...props}
            apiKey="t3j8g1sr4fn45538j9zvgsx2rx182gztzud61l8y8inwgt7g"
            init={{
                skin: "borderless",
                height: 300,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help',
            }}
        />
    );
}