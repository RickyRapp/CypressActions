import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const CustomCellTemplate = (props) => {
    const { dataItem, onClick } = props;

    return (
        <td>
            <div className="table__status">
                {dataItem.booklets ? dataItem.booklets.map((c, i) => {
                    return (
                        <span
                            key={c.code}
                            className="btn btn--link"
                            onClick={() => onClick(c.code)}>{c.code}{(i + 1) === dataItem.booklets.length ? '' : ', '}
                        </span>
                    )
                }
                ) : <span>Booklets not assigned</span>}
            </div>
        </td>
    );
};

CustomCellTemplate.propTypes = {
    dataItem: PropTypes.object.isRequired,
    onClick: PropTypes.func
};

export default defaultTemplate(CustomCellTemplate);
