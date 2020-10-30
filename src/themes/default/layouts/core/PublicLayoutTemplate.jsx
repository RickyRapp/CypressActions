import React from 'react';
import PropTypes from 'prop-types';
import 'themes/styles/public.css';
import phone from 'themes/styles/postcss-svg/old/phone.svg'
import { Link } from 'mobx-state-router';

function PublicLayoutTemplate({ render, rootStore, ...props }) {
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
                            <span className="membership--primary--ondesktop__link" onClick={() => rootStore.routerStore.goTo('master.public.membership.login')}>-</span>
                        </div>
                    </div>
                </div>

                <div className="header--secondary">
                    <div className="containerold">
                        <nav role="navigation">
                            <span className="logo" onClick={() => rootStore.routerStore.goTo('master.public.main.home')}></span>
                            <div className="nav">
                                <ul className="nav__list">
                                    <li className="nav__list__item">
                                        <a className="nav__list__link" href="/what-we-offer" onClick={(e) => { rootStore.routerStore.goTo('master.public.main.what-we-offer'); e.preventDefault(); }} >What We Offer</a>
                                    </li>
                                    <li className="nav__list__item">
                                        <a className="nav__list__link" href="/daf-101" onClick={(e) => { rootStore.routerStore.goTo('master.public.main.daf-101'); e.preventDefault(); }}>DAF 101</a>
                                    </li>
                                    <li className="nav__list__item">
                                        <a className="nav__list__link" href="7company" onClick={(e) => { rootStore.routerStore.goTo('master.public.main.company'); e.preventDefault(); }}>Company</a>
                                    </li>
                                    <li className="nav__list__item">
                                        <span className="nav__list__link btn btn--primary btn--med" href="/register" onClick={(e) => { rootStore.routerStore.goTo('master.public.main.register'); e.preventDefault(); }}>Get Started</span>
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
    render: PropTypes.func,
    rootStore: PropTypes.object.isRequired

}

export default PublicLayoutTemplate;