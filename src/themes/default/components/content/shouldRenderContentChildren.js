import { Content } from 'core/layouts';

export default function shouldRenderContentChildren(children) {
    if (children && children.length > 0) {
        var child = children[0];
        if (child.type === Content) {
            return child.props.empty
                || child.props.loading
                || child.props.error
        }
    }

    return false;
}