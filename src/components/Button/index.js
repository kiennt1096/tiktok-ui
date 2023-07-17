import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    disable = false,
    rounded = false,
    children,
    small = false,
    large = false,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        text,
        disable,
        rounded,
        [className]: className,
    });
    //Nếu mà có disable thì thực hiện bỏ tất cả các hàm on.. đi (VD onClick, onMouseUp ...),
    //tránh trường hợp khi người dùng vào F12 để bỏ disable đi thì vẫn sẽ gọi được các hàm on...
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}
Button.proTypes = {
    to:PropTypes.string,
    href:PropTypes.string,
    primary:PropTypes.bool,
    outline:PropTypes.bool,
    text:PropTypes.bool,
    disable:PropTypes.bool,
    rounded:PropTypes.bool,
    children:PropTypes.node.isRequired,
    small:PropTypes.bool,
    large:PropTypes.bool,
    className:PropTypes.string,
    leftIcon:PropTypes.node,
    rightIcon:PropTypes.node,
    onClick:PropTypes.func,
}

export default Button;
