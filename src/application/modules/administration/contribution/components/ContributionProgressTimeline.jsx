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

        console.log(statusList)
        if (statusList != null) {
            statusList.forEach(stat => {
                if (stat.abrv == 'pending')
                    pendingStatus = stat;
                if (stat.abrv == 'in-process' || stat.currentStatus == 'in-process')
                    inProcessStatus = stat;
                if (stat.abrv == 'funded' || stat.currentStatus =='funded')
                    fundedStatus = stat;
                else if (stat.abrv == 'canceled')
                    canceledStatus = stat;
                else if (stat.abrv == 'declined')
                    declinedStatus = stat;
            });
        }

        return (
            <React.Fragment>
                <div className="row">
                    {pendingStatus && pendingStatus.abrv == 'pending' ? <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('1.Initiated')}</div>
                        <span className="input--preview">
                            <FormatterResolver
                                item={{ dateCreated: pendingStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div> : 
                    <div className="col col-sml-12 col-lrg-4">
                    <div className="type--base type--wgt--medium type--color--note">{t('1.Initiated')}</div>
                    <span className="input--preview">
                        <FormatterResolver
                            item={{ dateCreated: item.dateCreated }}
                            field='dateCreated'
                            format={{ type: 'date', value: 'short' }}
                        />
                    </span>
                </div>
                }
                    {canceledStatus && canceledStatus.abrv == 'canceled' && <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('4.Canceled')}</div>
                        <span className="input--preview">
                            <FormatterResolver
                                item={{ dateCreated: canceledStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}

                    {declinedStatus && declinedStatus.abrv == 'declined' && <div className="col col-sml-12 col-lrg-4">
                        <div className="type--base type--wgt--medium type--color--note">{t('4.Declined')}</div>
                        <span className="input--preview">
                            <FormatterResolver
                                item={{ dateCreated: declinedStatus.dateCreated }}
                                field='dateCreated'
                                format={{ type: 'date', value: 'short' }}
                            />
                        </span>
                    </div>}

                    {!declinedStatus && !canceledStatus && inProcessStatus && (inProcessStatus.currentStatus == 'in-process' || inProcessStatus.abrv =='in-process') ?
                        <div className='row'>
                            <div className="col col-sml-12 col-lrg-4">
                                <div className="type--base type--wgt--medium type--color--note">{t('2.In process')}</div>
                                <span className="input--preview">
                                    <FormatterResolver
                                        item={{ dateCreated: inProcessStatus.dateCreated }}
                                        field='dateCreated'
                                        format={{ type: 'date', value: 'short' }}
                                    />
                                </span>
                            </div>
                        </div> : 
                           <div className="col col-sml-12 col-lrg-4">
                           <div className="type--base type--wgt--medium type--color--note">{t('2.In process')}</div>
                           </div>
                    }

                    {!declinedStatus && !canceledStatus && fundedStatus && (fundedStatus.currentStatus == 'funded' || fundedStatus.abrv =='funded') ?
                        <div className="col col-sml-12 col-lrg-4">
                            <div className="type--base type--wgt--medium type--color--note">{t('3.Settled')}</div>
                            <span className="input--preview">
                                <FormatterResolver
                                    item={{ dateCreated: fundedStatus.dateCreated }}
                                    field='dateCreated'
                                    format={{ type: 'date', value: 'short' }}
                                />
                            </span>
                        </div>
                        :
                        <div className="col col-sml-12 col-lrg-4">
                            <div className="type--base type--wgt--medium type--color--note">{t('3.Settled')}</div>
                        </div>
                    }
                
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
