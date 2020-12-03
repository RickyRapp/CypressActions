import React from 'react';
import PropTypes from 'prop-types';

import md5 from 'md5';

const baseUrl = 'https://www.gravatar.com/avatar/';
const imgUrl = 'https://www.flaticon.com/svg/static/icons/svg/17/17004.svg'

function GravatarTemplate({email, size}) {
    const hash = md5(email, {encoding: 'binary'});

    const src = baseUrl + hash;

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
