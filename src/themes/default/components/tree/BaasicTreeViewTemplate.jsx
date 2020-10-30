import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {defaultTemplate} from 'core/hoc';

import 'rc-tree/assets/index.css';
import Tree from 'rc-tree';

import {BaasicTreeViewSearch} from 'core/components/tree';
import {generateNodes} from 'core/utils/tree';

class BaasicTreeViewTemplate extends Component {
    filterKeys = [];

    getNodes = (data) => {
        const { config: { isSelectable, isCheckable } } = this.props.store;

        return generateNodes(
            data,
            ({ item, props, depth }) => {
                return {
                    ...props,
                    depth,
                    isFilterMatch: item.isFilterMatch,
                    disableCheckbox: typeof isCheckable === 'function' ? !isCheckable({ item, depth }) : !isCheckable,
                    selectable: typeof isSelectable === 'function' ? isSelectable({ item, depth }) : isSelectable,
                }
            },
            0
        );
    };

    render() {
        const { store } = this.props;
        const {
            expandedKeys,
            data,
            autoExpandParent,
            checkable,
            selectable,
            config: {
                showIcon
            },
            onSearch,
            onExpand,
            onSelect,
            onCheck,
            state,
        } = store;
        const {
            selectedKeys,
            checkedKeys,
            searchTerm,
        } = state;

        return (
            <React.Fragment>
                <div className='treeview'>
                    <div className='pos--rel'>
                        <BaasicTreeViewSearch
                            className='treeview__search'
                            searchTerm={searchTerm}
                            onSearch={onSearch}
                            />
                    </div>
                    <Tree
                        checkable={checkable}
                        selectable={selectable}
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        onSelect={onSelect}
                        selectedKeys={selectedKeys}
                        filterTreeNode={(treeNode) => treeNode.props.isFilterMatch === true}
                        showIcon={showIcon}
                        className='treeview__list'
                    >
                        {this.getNodes(data)}
                    </Tree>
                    {checkable &&
                    <div className='treeview__footer'>
                        <button className='btn btn--sml btn--tertiary' onClick={e => onCheck([], e)}>Clear</button>
                    </div>}
                </div>
            </React.Fragment>
        );
    }
}

BaasicTreeViewTemplate.propTypes = {
    store: PropTypes.object.isRequired,
};

BaasicTreeViewTemplate.defaultProps = {
    checkable: false,
    insideContent: false
};

export default defaultTemplate(BaasicTreeViewTemplate);
