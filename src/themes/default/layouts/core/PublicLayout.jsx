import React from 'react';
import PropTypes from 'prop-types';
import 'themes/styles/public.css';
import phone from 'themes/styles/postcss-svg/old/phone.svg'

function PublicLayoutTemplate({ render, ...props }) {
    return (
        <React.Fragment>
            <header>
                <div className="header--primary section--secondary">
                    <div className="containerold">
                        <span className="spc--right--med type--negative type--small">
                            Resources
                        </span>
                        <span className="spc--right--med type--negative type--small">
                            Support
                        </span>
                        <span className="spc--right--med type--negative type--small">
                            <a href='tel:844-666-0808'>
                                <img src={phone} width="18" />
                                844.666.0808
                            </a>
                        </span>
                        <div className="membership--primary--ondesktop">
                            <span className="membership--primary--ondesktop__link" onClick={() => props.rootStore.routerStore.goTo('master.public.membership.login')}>-</span>
                        </div>
                    </div>
                </div>

                <div className="header--secondary">
                    <div className="containerold">
                        <nav role="navigation">
                            <span className="logo" onClick={() => props.rootStore.routerStore.goTo('master.public.main.home')}></span>
                            <div className="nav">
                                <ul className="nav__list">
                                    <li className="nav__list__item">
                                        <a className="nav__list__link" href="#">What We Offer</a>
                                    </li>
                                    <li className="nav__list__item">
                                        <a className="nav__list__link" href="#">DAF 101</a>
                                    </li>
                                    <li className="nav__list__item">
                                        <a className="nav__list__link" href="#">Company</a>
                                    </li>
                                    <li className="nav__list__item">
                                        <span className="nav__list__link btn btn--primary btn--med" onClick={() => props.rootStore.routerStore.goTo('master.public.main.register')}>Get Started</span>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <main>
                {render(props)}
            </main>
        </React.Fragment>
    )
}

PublicLayoutTemplate.propTypes = {
    render: PropTypes.func
}

export default PublicLayoutTemplate;