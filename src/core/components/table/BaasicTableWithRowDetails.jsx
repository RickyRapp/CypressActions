import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TableWithRowDetailsViewStore, SelectTableWithRowDetailsViewStore} from "core/stores";
import {BaasicTable, BaasicTableRowDetail} from "core/components";

class BaasicTableWithRowDetails extends Component {
    render() {
        const DetailComponent = this.props.detailComponent;

        return (
            <BaasicTable
                {...this.props}
                onExpandChange={this.props.tableStore.onExpand}
                detail={detailProps => <DetailComponent {...detailProps} updateGrid={this.props.tableStore.updateDataItems} />}
            />
        );
    }
}

BaasicTableWithRowDetails.propTypes = {
    tableStore: PropTypes.oneOfType([
        PropTypes.instanceOf(TableWithRowDetailsViewStore),
        PropTypes.instanceOf(SelectTableWithRowDetailsViewStore),
    ]),
    loading: PropTypes.bool,
    actionsComponent: PropTypes.any,
    noRecordsComponent: PropTypes.any,
    editField: PropTypes.string,
    detailComponent: PropTypes.any
};

BaasicTableWithRowDetails.defaultProps = {
    detailComponent: BaasicTableRowDetail
};

export default BaasicTableWithRowDetails;
