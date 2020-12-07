import React from "react"
import { Editor } from '@tinymce/tinymce-react'

const CustomEditor = (props) => {

    const [editor] = React.useState(props.value)

    const onChange = (content, editor) => {
        return props.onChange(content)
    }

    return (
        <div>
            <Editor
                apiKey={`${process.env.REACT_APP_API_KEY_TINY}`}
                value={editor}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={onChange}
                />
        </div>
    )

}

export default CustomEditor
