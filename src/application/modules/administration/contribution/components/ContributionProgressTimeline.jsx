import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { FormatterResolver } from 'core/components';

class ContributionProgressTimeline extends Component {
    render() {
        const { item, t, statusList } = this.props;
        var fundedStatus = null;
        var canceledStatus = null;
        var declinedStatus = null;
        var inProcessStatus = null;
        var pendingStatus = null;

        if (statusList != null) {
            statusList.forEach(stat => {
                if (stat.abrv == 'pending')
                    pendingStatus = stat;
                if (stat.abrv == 'in-process')
                    inProcessStatus = stat;
                if (stat.abrv == 'funded')
                    fundedStatus = stat;
                else if (stat.abrv == 'canceled')
                    canceledStatus = stat;
                else if (stat.abrv == 'declined')
                    declinedStatus = stat;
            });
        }

        return (
            <React.Fragment>
                <div className="wizard">
                    {pendingStatus && pendingStatus.abrv == 'pending' ? <div className="wizard__item  is-checked">
                        <div className="wizard__item__title">{t('Initiated')}</div>
                        <span className="wizard__item__value">
                            <FormatterResolver
                                item={{ dateCreated: pendingStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div> :
                        <div className="wizard__item is-checked">
                            <div className="wizard__item__title">{t('Initiated')}</div>
                            <span className="wizard__item__value">
                                <FormatterResolver
                                    item={{ dateCreated: item.dateCreated }}
                                    field='dateCreated'
                                    format={{ type: 'date', value: 'short' }}
                                />
                            </span>
                        </div>
                    }
                    {canceledStatus && canceledStatus.abrv == 'canceled' && <div className="wizard__item is-checked">
                        <div className="wizard__item__title">{t('Canceled')}</div>
                        <span className="wizard__item__value">
                            <FormatterResolver
                                item={{ dateCreated: canceledStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}

                    {declinedStatus && declinedStatus.abrv == 'declined' && <div className="wizard__item is-checked">
                        <div className="wizard__item__title">{t('Declined')}</div>
                        <span className="wizard__item__value">
                            <FormatterResolver
                                item={{ dateCreated: declinedStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}
                    {!declinedStatus && !canceledStatus && <React.Fragment>
                        {!declinedStatus && !canceledStatus && inProcessStatus && (inProcessStatus.currentStatus == 'in-process' || inProcessStatus.abrv == 'in-process') ?
                        <React.Fragment>
                            <div className="wizard__item is-checked">
                                <div className="wizard__item__title">{t('In process')}</div>
                                <span className="wizard__item__value">
                                    <FormatterResolver
                                        item={{ dateCreated: inProcessStatus.dateCreated }}
                                        field='dateCreated'
                                        format={{ type: 'date', value: 'short' }}
                                    />
                                </span>
                            </div>
                        </React.Fragment> :
                        <React.Fragment>
                            <div className="wizard__item ">
                                <div className="wizard__item__title">{t('In process')}</div>
                            </div>
                        </React.Fragment>
                    }

                    {!declinedStatus && !canceledStatus && fundedStatus && (fundedStatus.currentStatus == 'funded' || fundedStatus.abrv == 'funded') ?
                        <div className="wizard__item is-checked">
                            <div className="wizard__item__title">{t('Settled')}</div>
                            <span className="wizard__item__value">
                                <FormatterResolver
                                    item={{ dateCreated: fundedStatus.dateCreated }}
                                    field='dateCreated'
                                    format={{ type: 'date', value: 'short' }}
                                />
                            </span>
                        </div>
                        :
                        <React.Fragment>
                            <div className="wizard__item ">
                                <div className="wizard__item__title">{t('Settled')}</div>
                            </div>
                        </React.Fragment>

                    }
                        </React.Fragment>}
                 

                </div>

            </React.Fragment>
        );
    }
}

ContributionProgressTimeline.propTypes = {
    item: PropTypes.object.isRequired,
    t: PropTypes.func
};

export default defaultTemplate(ContributionProgressTimeline);
