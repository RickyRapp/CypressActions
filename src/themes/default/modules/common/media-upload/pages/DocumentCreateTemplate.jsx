import React from 'react';
import { defaultTemplate } from 'core/utils';
import Dropzone from 'react-dropzone'

function DocumentCreateTemplate({ mediaUploadCreateViewStore }) {
    const {
        onDropFile,
        maxSize,
        isMultiple,
        acceptFileExtensions,
        onSubmit,
        files,
        removeFile,
        isRemoveEnabled,
        isThumbnailEnabled
    } = mediaUploadCreateViewStore;

    const previewContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    };

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    };

    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };

    const preview = files.map(file => (
        <div key={file.name}>
            {file.name} - {file.size} bytes {isRemoveEnabled ? <button onClick={() => removeFile(file)}>Remove</button> : null}
            {isThumbnailEnabled && file.preview &&
                <div style={thumb} >
                    <div style={thumbInner}>
                        <img
                            src={file.preview}
                            style={img}
                        />
                    </div>
                </div>}
        </div>
    ));

    return (
        <React.Fragment>
            <Dropzone
                onDrop={onDropFile}
                accept={acceptFileExtensions}
                minSize={0}
                maxSize={maxSize}
                multiple={isMultiple ? true : false}

            >
                {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, rejectedFiles }) => {
                    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

                    return (
                        <React.Fragment >
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {!isDragActive && 'Click here or drop a file to upload!'}
                                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                {isDragReject && "File type not accepted, sorry!"}
                                {isFileTooLarge && (
                                    <div className="text-danger mt-2">
                                        File is too large.
                            </div>
                                )}
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            <aside style={previewContainer}>
                                {preview}
                            </aside>
                        </React.Fragment>
                    )
                }}
            </Dropzone>
            <button onClick={onSubmit}>Save</button>
        </React.Fragment>
    );
}

export default defaultTemplate(DocumentCreateTemplate);






