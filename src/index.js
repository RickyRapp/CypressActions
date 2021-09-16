import 'react-toastify/dist/ReactToastify.css';
import 'themes/styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { I18nextProvider } from 'react-i18next';
import { localizationService } from 'core/services';
import registerServiceWorker from './registerServiceWorker';
import { App } from 'core/components';
import { bootstrap } from 'common/infrastructure';
import { RootStore } from 'common/stores';
import Modal from 'react-modal';

function startApplication() {
	const configuration = bootstrap.run();

	const rootStore = new RootStore(configuration);
	renderApp({ rootStore });
	registerServiceWorker();
}

function renderApp({ rootStore }) {
	Modal.setAppElement('#root')
	ReactDOM.render(
		<I18nextProvider i18n={localizationService}>
			<Provider rootStore={rootStore}>
				<App />
			</Provider>
		</I18nextProvider>,
		document.getElementById('root')
	);
}

startApplication();