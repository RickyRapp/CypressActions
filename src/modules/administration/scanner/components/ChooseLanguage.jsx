import React from 'react';
import { observer } from 'mobx-react';

@observer
class ChooseLanguage extends React.Component {
    render() {

        return (
            <div>
                <div>
                    To begin please select a language
            </div>
                <div>
                    כדי להתחיל בבקשה בחר שפה
                </div>
                <button onClick={() => this.props.nextStep()}>next</button>
            </div>
        )
    }
}

export default ChooseLanguage;
