import React from 'react';
import { inject } from 'mobx-react';
import _ from 'lodash';

const ShareParentContext = React.createContext(null);

const withParent = Component =>
    class WithParent extends React.Component {
        render() {
            return (
                <ShareParentContext.Consumer>
                    {parentView =>
                        <Component
                            {...this.props}
                            parentView={parentView}
                        />
                    }
                </ShareParentContext.Consumer>
            );
        }
    }

function setCurrentView(getView, name = 'currentView') {
    return function (Component) {
        @inject((i, p) => {
            const {parentView, props, ref, rootStore, ...componentProps} = p;

            return {
                rootStore: i.rootStore,
                componentProps: componentProps
            }
        })
        class WrapComponent extends React.Component {
            constructor(props) {
                super(props);

                this.initializeView(props);
            }

            view = null;

            initializeView({ rootStore, parentView, storeName, componentProps }) {
                const customStoreName = !_.isUndefined(storeName) && !_.isNull(storeName) && storeName !== '' ? storeName : name;
                const parent = parentView || rootStore;
                let propertyName = getPropertyName(parent, customStoreName);

                let currentView = typeof getView === 'function' ? getView(rootStore, componentProps) : getView;
                parent[propertyName] = currentView;

                this.view = {
                    [name]: currentView, // this is used for passing in props so child always gets view under defined name
                    propertyName: propertyName,
                    parentView: parent
                };
            }

            componentWillUnmount() {
                const {
                    rootStore,
                    parentView
                } = this.props;

                const currentView = this.view.parentView[this.view.propertyName];
                if (currentView && currentView.destroy && typeof currentView.destroy === 'function') {
                    currentView.destroy();
                }
                
                this.view.parentView[this.view.propertyName] = null;
            }

            render() {
                const { propertyName, parentView, ...other } = this.view;

                return (
                    <ShareParentContext.Provider value={this.view[name]}>
                        <Component {...this.props} {...other} />
                    </ShareParentContext.Provider>
                )
            }
        }

        return withParent(WrapComponent);
    }
}

function getPropertyName(obj, name, idx = -1) {
    const propertyName = idx !== -1 ? name + '_' + idx : name;
    const property = obj[propertyName];
    if (property !== undefined && property !== null) {
        return getPropertyName(obj, name, idx + 1);
    }

    return propertyName;
}

export default setCurrentView;
