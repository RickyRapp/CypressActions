import React from 'react';
import {TreeNode} from 'rc-tree';
import _ from 'lodash';

export const ROOT_KEY = 'unique-root-key';

/**
 * This is default mapping function. Used for only one level nesting
 * @param data Array of objects {}
 * @returns {*}
 */
function defaultMappingFn(data) {
    return data.map(i => ({id: i.id, name: i.name}));
}

/**
 * This is default mapping function with root element. Used for only one level nesting
 * @param data Array of objects
 * @param rootName Name of root element
 * @returns {*[]}
 */
function defaultMappingFnWithRoot(data, rootName = 'Root') {
    return [{ id: ROOT_KEY, name: rootName, children: data.map(i => ({ id: i.id, name: i.name })) }];
}

function arrDel(list, value) {
    const clone = list.slice();
    const index = clone.indexOf(value);
    if (index >= 0) {
        clone.splice(index, 1);
    }
    return clone;
}

function arrAdd(list, value) {
    const clone = list.slice();
    if (clone.indexOf(value) === -1) {
        clone.push(value);
    }
    return clone;
}

function loop(data, callback, depth = 0) {
    _.each(data, (item, index, arr) => {
        callback({ item, index, arr, depth });

        if (item.children) {
            loop(item.children, callback, depth + 1);
        }
    });
}

// syncs provided tree data with provided changes
// changes: [{ newParentKey, node }] where items from tree with specified
// node.id will be replaced or changed (replaced if newParentKey is different from old parent)
function updateTreeData(treeData, changes) {
    const actions = [];
    loop(treeData, ({ item, index, arr }) => {
        _.each(changes, ({ newParentKey, node }) => {
            if (item.id === newParentKey) {
                item.children = item.children || [];

                const match = _.find(item.children, c => c.id === node.id);
                if (match) {
                    actions.push({ id: node.id, action: () => _.assign(match, node), type: 'update' });
                } else {
                    actions.push({ id: node.id, action: () => item.children = [...item.children, node], type: 'add' });
                }
            }

            if (item.id === node.id) {
                actions.push({ id: node.id, action: () => arr.splice(index, 1), type: 'remove' });
            }
        })
    });

    const update = _.filter(actions, a => a.type === 'update');
    const remove = _.filter(actions, a => a.type === 'remove' && !_.some(update, u => u.id === a.id));
    const add = _.filter(actions, a => a.type === 'add');

    const sortActions = [
        ...remove,
        ...add,
        ...update
    ];

    _.each(sortActions, a => a.action());
    const newRootNodes = _.map(_.filter(changes, c => !c.newParentKey && c.node), a => a.node);
    return [...treeData, ...newRootNodes];
}

function generateNodes(data, getProps, depth = 0) {
    return data.map(item => {
        const defaultProps = {
            key: item.id,
            title: item.name,
        };

        if(item.abrv) {
            defaultProps.icon = <i className={'icomoon icon-' + item.abrv + ' spc--right--tny'} />
        }

        const props = getProps ? getProps({ item, props: defaultProps, depth }) : defaultProps;

        return (
            <TreeNode key={item.id} {...props}>
                {
                    item.children && item.children.length > 0
                        ? generateNodes(item.children, getProps, depth + 1)
                        : null
                }
            </TreeNode>
        )
    });
}

function posToArray(pos) {
    return _.map(_.split(pos, '-'), _.toNumber);
}

/*
    Gets element at specified index paths
    [1, 2, 3, 3] -> gets elements at:
    tree[1]
        children[2]
            children[3]
                children[3]

*/
function getByIndexPath(data, indexPath, nestedKey = 'children') {
    let levelData = data;
    let depth = -1;

    return _.map(indexPath, i => {
        const item = levelData[i];

        if (item && item[nestedKey]) {
            levelData = item[nestedKey];
        }

        return {
            item: item || null,
            index: i,
            depth: (depth = depth + 1)
        }
    });
}

function findNode(treeData, predicate) {
    var stack = [],
        ii;

    _.each(treeData, r => {
        stack.push({ path: [r], item: r });
    });

    while (stack.length > 0) {
        const { path, item } = stack.pop();
        if (predicate({ item, path })) { // if found return immediatelly
            return { path, item };
        }

        if (item.children && item.children.length) {
            for (ii = 0; ii < item.children.length; ii += 1) {
                const child = item.children[ii];
                stack.push({
                    path: [...path, child],
                    item: child
                });
            }
        }
    }

    return null;
}

export {
    updateTreeData,
    arrAdd,
    arrDel,
    generateNodes,
    loop,
    posToArray,
    getByIndexPath,
	defaultMappingFn,
    findNode,
	defaultMappingFnWithRoot
};
