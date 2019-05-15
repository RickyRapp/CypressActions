import { action, observable } from 'mobx';
import React, { useEffect, useState, useMemo } from 'react';
import { BaseViewStore } from 'core/stores';
import { useDropzone } from 'react-dropzone';


class MediaUploadStore extends BaseViewStore {

    constructor(rootStore) {
        super(rootStore);
    }
}

export default MediaUploadStore;
