import React from 'react';
import PropTypes from 'prop-types';
// import DevTools from 'mobx-react-devtools';
import { IntlProvider, IntlService } from '@progress/kendo-react-intl';

class ExtendedIntlService extends IntlService {
    formatDate(value, format) {
        return super.formatDate(value, format);
    }

    dateFieldName(options) {
        const field = super.dateFieldName(options);
        return field;
    }

    dateFormatNames(options) {
        const names = super.dateFormatNames(options);
        return names;
    }

    firstDay() {
        const idx = super.firstDay();
        return idx;
    }

    format(format, values) {
        const formattedString = super.format(format, values);
        return formattedString;
    }

    formatNumber(value, format) {
        const formattedNumber = super.formatNumber(value, format);
        return formattedNumber;
    }

    numberSymbols() {
        const numberSymbols = super.numberSymbols();
        return numberSymbols;
    }

    parseDate(value, format) {
        const parsedDate = super.parseDate(value, format);
        return parsedDate;
    }

    parseNumber(value, format) {
        const parsedNumber = super.parseNumber(value, format);
        return parsedNumber;
    }

    splitDateFormat(format) {
        return super.splitDateFormat(format);
    }

    toString(value, format) {
        const formattedObject = super.toString(value, format);
        return formattedObject;
    }
}

// eslint-disable-next-line
class CustomFormatIntlProvider extends IntlProvider {
    getIntlService() {
        return new ExtendedIntlService(this.props.locale);
    }
}

function MasterLayoutTemplate({ render, ...props }) {
    return (
        <React.Fragment>
            {/* <DevTools position={{ bottom: 0 }} /> */}

            {render(props)}
        </React.Fragment>
    );
}

MasterLayoutTemplate.propTypes = {
    render: PropTypes.func
};

export default MasterLayoutTemplate;