import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { get, forEach, filter, isNil } from 'lodash';

class GridRowTemplate extends React.Component {
    state = {
        previousDataItem: toJS(this.props.dataItem),
        dataItem: this.props.dataItem
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.tableStore.config.comparerFunction) {
            const previousDataItem = this.state.previousDataItem;
            const currentDataItem = nextProps.dataItem;

            const comparerResult = this.props.tableStore.config.comparerFunction(previousDataItem, currentDataItem);
            return comparerResult || currentDataItem !== this.state.dataItem;
        }
        return true;
    }

    static getDerivedStateFromProps(props) {
        return {
            previousDataItem: toJS(props.dataItem),
            dataItem: props.dataItem
        }
    }

    render() {
        const { trElement, dataItem, tableStore } = this.props;

        const usesContextMenu = !!tableStore.config.contextMenu;
        const usesRowDoubleClick = !!tableStore.config.actions.onRowDoubleClick;
        const hasCustomClass = !!tableStore.config.rowCustomClassConfig;

        const trProps = {};
        trProps.className = tableStore.config.disableAlternateRowColors ? "k-master-row" : trElement.props.className;
        trProps.disabled = true;

        const elementsIncludingDisableParentRule = filter(tableStore.config.columns, item => {
            return item && item.cellProps && item.cellProps.rules && item.cellProps.rules.includes('parentIsDisabled:true');
        });
        const isElementedMutated = elementsIncludingDisableParentRule.length > 0;
        const elementCopyChildren = [];
        if (isElementedMutated) {
            forEach(trElement.props.children, item => {
                const indexOfElementToDisable = elementsIncludingDisableParentRule.findIndex(({ key }) => { return key == item.props.field });
                if (indexOfElementToDisable > -1 && !isNil(item.props.dataItem.isParent)) { // eslint-disable-next-line
                    const { onChange, className, ...otherProps } = item.props;
                    const currentChild = React.createElement(item.type, { ...otherProps, onChange: () => {}, key: item.key, className: 'disabled' });
                    elementCopyChildren.push(currentChild);
                } else {
                    elementCopyChildren.push(item);
                }
            });
        }
        const trElementCopy = React.createElement('tr', { ...trElement.props }, [...elementCopyChildren]);

        if (hasCustomClass) {
            forEach(tableStore.config.rowCustomClassConfig, c => {
                if (get(dataItem, c.key) && get(dataItem, c.key) === c.value) {
                    trProps.className = trProps.className + " " + c.class;
                }
            });
        }
        if (usesRowDoubleClick) {
            trProps.onDoubleClick = () => {
                tableStore.config.actions.onRowDoubleClick(dataItem);
            }
        }
        if (usesContextMenu) {
            trProps.onContextMenu = (e) => {
                e.preventDefault(); // prevent opening browser context menu
                tableStore.setContextMenuPosition({ left: e.clientX, top: e.clientY });
            }
        }

        return React.cloneElement(isElementedMutated ? trElementCopy : trElement, trProps, isElementedMutated ? trElementCopy.props.children : trElement.props.children);
    }
}

GridRowTemplate.propTypes = {
    dataItem: PropTypes.object,
    tableStore: PropTypes.object,
    trElement: PropTypes.any
};

export default GridRowTemplate;