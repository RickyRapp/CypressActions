import _ from 'lodash';
import { observable, computed } from 'mobx';

class MenuItem {
  title = null;
  icon = null;
  route = null;
  parent = null;

  @observable subMenu = [];

  @computed get hasChildren() {
    return this.subMenu && this.subMenu.length > 0;
  }

  get canNavigate() {
    return this.route && this.route !== '';
  }

  constructor(json) {
    this.title = json.title;
    this.parent = json.parent || null;
    this.route = json.route;
    this.path = _.reverse([
      this,
      ...(this.parent ? _.reverse([...this.parent.path]) : [])
    ]);

    this.depth = this.path.length;

    if (json.subMenu) {
      this.subMenu = _.map(json.subMenu, item => {
        return new MenuItem({
          ...item,
          subMenu: item.subMenu,
          parent: this
        });
      });
    }

    this.equals = this.equals.bind(this);
    this.isActiveByPath = this.isActiveByPath.bind(this);
  }

  getRoute(forceLeaf = false) {
    if (!this.canNavigate) {
      if (forceLeaf && this.hasChildren) {
        const subItem = this.subMenu[0]; // immediatelly navigate to first child
        return subItem.getRoute();
      }
    } else {
      const route =
        typeof this.route === 'function' ? this.route() : this.route;
      if (route !== null) {
        return route;
      }
    }

    return null;
  }

  equals(other) {
    return (
      this.depth === other.depth &&
      this.title === other.title &&
      this.route === other.route
    );
  }

  isActiveByPath(path) {
    if (path.length < this.path.length) return false;
    return _.every(this.path, (p, idx) => p.equals(path[idx]));
  }
}

export default MenuItem;
