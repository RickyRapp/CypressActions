import React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

@observer
class StepCounter extends React.Component {
    render() {
        const { currentStep, steps } = this.props;
        return (
            <span>
                {_.map(steps, step => {
                    return <Step key={step} step={step} selected={step === currentStep}></Step>
                })}
            </span>)
    }
}

const Step = ({ step, selected }) => <span>{selected ? <span className="type--color--error">{step}</span> : step}</span>

export default StepCounter;
