import React from 'react';
import PropTypes from 'prop-types';

const imgUrl = 'https://www.pngkit.com/png/full/281-2812821_user-account-management-logo-user-icon-png.png'

function GravatarTemplate({ email, size }) {

    return (
        <img
            alt={`Gravatar for ${email}`}
            src={imgUrl}
            height={size}
            width={size}
            className={'header__profile__img'}
        />
    )
}

GravatarTemplate.propTypes = {
    email: PropTypes.string,
    size: PropTypes.number
};

export default GravatarTemplate;
