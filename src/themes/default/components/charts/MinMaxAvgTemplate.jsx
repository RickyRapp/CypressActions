import React from 'react';
import PropTypes from 'prop-types';

import { average } from 'core/components/charts';
import { defaultTemplate } from 'core/hoc';

const MinMaxAvg = function(props) {
    const renderDataEntity = function(entity) {
        return (
            <div className='col col-sml-6'>
                <div className='card card--med card--primary spc--bottom--med type--center'>
                    <div className='spc--bottom--tny type--wgt--medium'>
                        {entity.name}
                    </div>
                    <hr className='separator separator--light' />
                    <div className='row'>
                        <div className='col col-sml-4'>
                            <h3 className='type--color--tertiary'>
                                {Math.max(...entity.data)}
                            </h3>
                            <p className='type--xsml'>Max</p>
                        </div>
                        <div className='col col-sml-4'>
                            <h3 className='type--color--tertiary'>
                                {average(entity.data)}
                            </h3>
                            <p className='type--xsml'>Avg</p>
                        </div>
                        <div className='col col-sml-4'>
                            <h3 className='type--color--tertiary'>
                                {Math.min(...entity.data)}
                            </h3>
                            <p className='type--xsml'>Min</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='row'>
            {props.data.map((dataEntity, idx) => (
                <React.Fragment key={idx}>
                    {renderDataEntity(dataEntity)}
                </React.Fragment>
            ))}
        </div>
    );
};

MinMaxAvg.propTypes = {
    data: PropTypes.array.isRequired
};

export default defaultTemplate(MinMaxAvg);
