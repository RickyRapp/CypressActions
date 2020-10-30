import * as React from 'react';
import { MultiViewCalendar } from '@progress/kendo-react-dateinputs';
import { defaultTemplate } from 'core/hoc';
import moment from 'moment';
import { PropTypes } from 'mobx-react';

const AdvancedCalendar = function (props) {
    const currentDate = new Date();
    const now_utc = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), 0, 0, 0);

    const lastWeekFirstDate = moment(new Date(now_utc)).add(-7, 'days').startOf('week').toDate();
    const lastWeekLastDate = moment(new Date(now_utc)).add(-7, 'days').endOf('week').toDate();

    const lastMonthFirstDate = moment(new Date(now_utc)).add(-1, 'months').startOf('month').toDate();
    const lastMonthLastDate = moment(new Date(now_utc)).add(-1, 'months').endOf('month').toDate();

    const lastYearFirstDate = moment(new Date(now_utc)).add(-1, 'years').startOf('year').toDate();
    const lastYearLastDate = moment(new Date(now_utc)).add(-1, 'years').endOf('year').toDate();

    const thisWeekFirstDate = moment(new Date(now_utc)).startOf('week').toDate();
    const thisWeekLastDate = moment(new Date(now_utc)).endOf('week').toDate();

    const thisMonthFirstDate = moment(new Date(now_utc)).startOf('month').toDate();
    const thisMonthLastDate = moment(new Date(now_utc)).endOf('month').toDate();

    const thisYearFirstDate = moment(new Date(now_utc)).startOf('year').toDate();
    const thisYearLastDate = moment(new Date(now_utc)).endOf('year').toDate();

    return (
        <div>
            <div className="row u-mar--left--med u-mar--top--tny">
                <div className="col col-lrg-3 u-mar--bottom--sml">
                    <button
                        type='button'
                        onClick={() =>
                            props.onChange({
                                value: {
                                    start: lastWeekFirstDate,
                                    end: lastWeekLastDate
                                }
                            })
                        }
                        className="btn btn--ghost"
                        title='Last month'
                    >
                        <span>
                            Last week
                    </span>
                    </button>
                </div>
                <div className="col col-lrg-3 u-mar--bottom--sml">
                    <button
                        type='button'
                        onClick={() =>
                            props.onChange({
                                value: {
                                    start: lastMonthFirstDate,
                                    end: lastMonthLastDate
                                }
                            })
                        }
                        className="btn btn--ghost"
                        title='Last month'
                    >
                        <span>
                            Last month
                    </span>
                    </button>
                </div>
                <div className="col col-lrg-3 u-mar--bottom--sml">
                    <button
                        type='button'
                        onClick={() =>
                            props.onChange({
                                value: {
                                    start: lastYearFirstDate,
                                    end: lastYearLastDate
                                }
                            })
                        }
                        className="btn btn--ghost"
                        title='Last year'
                    >
                        <span>
                            Last year
                    </span>
                    </button>
                </div>
            </div>
            <div className="row  u-mar--left--med">
                <div className="col col-lrg-3 u-mar--bottom--sml">
                    <button
                        type='button'
                        onClick={() =>
                            props.onChange({
                                value: {
                                    start: thisWeekFirstDate,
                                    end: thisWeekLastDate
                                }
                            })
                        }
                        className="btn btn--ghost"
                        title='Last month'
                    >
                        <span>
                            This week
                    </span>
                    </button>
                </div>
                <div className="col col-lrg-3 u-mar--bottom--sml">
                    <button
                        type='button'
                        onClick={() =>
                            props.onChange({
                                value: {
                                    start: thisMonthFirstDate,
                                    end: thisMonthLastDate
                                }
                            })
                        }
                        className="btn btn--ghost"
                        title='Last month'
                    >
                        <span>
                            This month
                    </span>
                    </button>
                </div>
                <div className="col col-lrg-3 u-mar--bottom--sml">
                    <button
                        type='button'
                        onClick={() =>
                            props.onChange({
                                value: {
                                    start: thisYearFirstDate,
                                    end: thisYearLastDate
                                }
                            })
                        }
                        className="btn btn--ghost"
                        title='Last year'
                    >
                        <span>
                            This year
                    </span>
                    </button>
                </div>
            </div>
            <div>
                <MultiViewCalendar
                    mode='range'
                    views={1}
                    onChange={props.onChange}
                    value={props.value}
                />
            </div>
        </div>
    );
}

AdvancedCalendar.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
};

export default defaultTemplate(AdvancedCalendar);