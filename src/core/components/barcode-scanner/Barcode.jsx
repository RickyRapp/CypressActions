import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BarcodeFormat, BrowserQRCodeSvgWriter } from '@zxing/library';
import JsBarcode from 'jsbarcode'
import BaasicButton from '../buttons/BaasicButton';

class Barcode extends Component {
    oneDType = false;
    twoDType = false;
    selector = null;
    jsBarcodeType = null;

    constructor(props) {
        super();
        switch (props.type) {
            case BarcodeFormat.QR_CODE:
                this.twoDType = true;
                break;
            case BarcodeFormat.DATA_MATRIX:
                this.twoDType = true;
                break;
            case BarcodeFormat.EAN_8:
                this.selector = 'ean-8';
                this.jsBarcodeType = 'ean8'
                this.oneDType = true;
                break;
            case BarcodeFormat.EAN_13:
                this.selector = 'ean-13';
                this.jsBarcodeType = 'ean13'
                this.oneDType = true;
                break;
            case BarcodeFormat.CODE_39:
                this.selector = 'code39';
                this.jsBarcodeType = 'code39'
                this.oneDType = true;
                break;
            case BarcodeFormat.CODE_128:
                this.selector = 'code128';
                this.jsBarcodeType = 'code128';
                this.oneDType = true;
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        if (this.oneDType) {
            JsBarcode(`#${this.selector}`, this.props.value, {
                format: this.jsBarcodeType,
                height: this.props.height || 100,
                width: this.props.width || 2,
                displayValue: this.props.displayValue
            });
        }
    }

    render() {
        const { value, height = 250, width = 250 } = this.props;

        let svgElement = null;
        if (this.twoDType) {
            const codeWriter = new BrowserQRCodeSvgWriter();
            svgElement = codeWriter.write(value, height, width);
        }

        return (
            <React.Fragment>
                {this.twoDType &&
                    <div dangerouslySetInnerHTML={{ __html: svgElement.outerHTML }} id="qr-code" />}
                {this.oneDType &&
                    <svg id={this.selector}></svg>}
            </React.Fragment>
        );
    }
}

Barcode.propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    displayValue: PropTypes.bool
};

Barcode.defaultProps = {
    type: BarcodeFormat.CODE_128,
    displayValue: true
};

export default Barcode;
