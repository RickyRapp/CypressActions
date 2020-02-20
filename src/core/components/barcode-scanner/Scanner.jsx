import React from 'react';
import { BrowserMultiFormatReader, NotFoundException, ChecksumException, FormatException } from '@zxing/library';
import { observer, inject } from 'mobx-react';
import { action, observable } from 'mobx';
import { isSome } from 'core/utils';
import BaasicButton from '../buttons/BaasicButton';

@inject((i) => ({
    notificationStore: i.rootStore.notificationStore
}))
@observer
class Scanner extends React.Component {
    @observable hasCamera = null;
    @observable running = false;

    constructor(props) {
        super();
        this.onBarcodeDetected = props.onBarcodeDetected;
        this.codeReader = new BrowserMultiFormatReader();
        //Supported:
        //1D - product: EAN-8, EAN-13
        //1D industrial: Code 39, Code 128, ITF, RSS-14
        //2D: QR Code, Data Matrix
        this.codeReader.timeBetweenDecodingAttempts = 500;
        this.notificationStore = props.notificationStore;
        this.codeReader.getVideoInputDevices()
            .then((videoInputDevices) => {
                if (videoInputDevices.length > 0) {
                    this.hasCamera = true;
                }
                else {
                    this.hasCamera = false;
                }
            })
    }

    @action.bound
    startStopDecoding() {
        try {
            this.codeReader.decodeFromVideoDevice(undefined, 'video', (result, err) => {
                if (result) {
                    if (_.isFunction(this.onBarcodeDetected)) {
                        this.onBarcodeDetected(result.text);
                    }
                }
                if (err) {
                    // As long as this error belongs into one of the following categories
                    // the code reader is going to continue as excepted. Any other error
                    // will stop the decoding loop.
                    //
                    // Excepted Exceptions:
                    //
                    //  - NotFoundException
                    //  - ChecksumException
                    //  - FormatException

                    if (err instanceof NotFoundException || err instanceof ChecksumException || err instanceof FormatException) {
                    }
                }
            })
        } catch (error) {
            console.log('error :', error);
        }
    }

    @action.bound
    onToggleRunning = () => {
        this.running = !this.running;
        if (this.running) {
            this.startStopDecoding()
        }
        else {
            this.codeReader.reset();
        }
    }

    render() {
        return (
            <React.Fragment>
                <BaasicButton
                    className="btn btn--icon"
                    icon={`u-icon u-icon--${this.running ? 'arrow-down' : 'arrow-right'} u-icon--sml`}
                    label={this.running ? 'Show' : 'Hide'}
                    onlyIcon={true}
                    disabled={this.hasCamera !== true}
                    onClick={() => this.onToggleRunning()}
                />
                {this.hasCamera === false && <div>Camera not found.</div>}
                {this.hasCamera === true && this.running &&
                    <video
                        id="video"
                        style={{ width: 300, height: 300 }}
                    />}
            </React.Fragment>
        );
    }
}

Scanner.propTypes = {
};

Scanner.defaultProps = {
};

export default Scanner;
