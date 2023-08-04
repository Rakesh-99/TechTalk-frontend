import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class CkEditor extends Component {



    render() {

        const { editorData, onDataChange } = this.props;


        return (
            <div className="App w-full px-10  ">

                <CKEditor style={{border:' 2px solid red'}}
                    editor={ClassicEditor}
                    data=""
                    onReady={editor => {

                    }}
                    onChange={(event, editor) => {

                        const data = editor.getData();
                        onDataChange(data);

                    }}
                    onBlur={(event, editor) => {
                    }}
                    onFocus={(event, editor) => {
                    }}
                />
            </div>
        );
    }
}

export default CkEditor;
