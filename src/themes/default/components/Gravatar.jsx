import React, {Component} from 'react';
import PropTypes from 'prop-types';

import md5 from 'md5';

const baseUrl = "https://www.gravatar.com/avatar/";

function GravatarTemplate({email, size, classNames}) {
    const hash = md5(email, {encoding: 'binary'});

    const src = baseUrl + hash;

    return (
        <img
            alt={`Gravatar for ${email}`}
            src={src}
            height={size}
            width={size}
            className={"header__profile__img"}
        />
    )
}

export default GravatarTemplate;
