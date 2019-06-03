import React from 'react';
import { defaultTemplate, isSome } from 'core/utils';
import _ from 'lodash';

function ThreeStateToggleFilterTemplate(
    {
        queryUtility,
        name,
        title,
        yesTitle = "Yes",
        noTitle = "No",
        neutralTitle = "0",
        yesValue = true,
        noValue = false,
        neutralValue = null
    }) {

    return (
        <div className="">
            <label>{title}</label>
            <div className="">
                <input
                    className=""
                    type="radio"
                    name={name}
                    checked={queryUtility.filter[name] === yesValue}
                    onChange={() => queryUtility.filter[name] = yesValue} />{yesTitle}
                <label></label>
                <input
                    className=""
                    type="radio"
                    name={name}
                    checked={!isSome(queryUtility.filter[name])}
                    onChange={() => queryUtility.filter[name] = neutralValue} />{neutralTitle}
                <label ></label>
                <input
                    className=""
                    type="radio"
                    name={name}
                    checked={queryUtility.filter[name] === noValue}
                    onChange={() => queryUtility.filter[name] = noValue} />{noTitle}
                <label></label>
            </div>
        </div>
    )
}

export default defaultTemplate(ThreeStateToggleFilterTemplate);



