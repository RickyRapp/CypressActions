import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { GridCell } from '@progress/kendo-react-grid';

class GridNumericCellTemplate extends GridCell{
    
    constructor(props){
        super();
        
        this.props = props;
        this.resolveRules(props);
    }

    handleChange = (e) => {
        let dataItem = this.props.dataItem;
        let value = e.target.value;

        if(!dataItem.errorField){
            dataItem.errorField = [];
        }

        const fieldName = (this.props.field).replace(/((?:from)|(?:to$))/i, '');
        dataItem.errorField = dataItem.errorField.filter(item => !item.includes(fieldName));

        if(value >= this.max || value <= this.min){
            dataItem.errorField.push(this.props.field);
        }
        
        if(value == null){
            value = 0;
        }

        this.props.onChange({
            dataItem: dataItem,
            field: this.props.field,
            syntheticEvent: e.syntheticEvent,
            value: value
        });
    }

    resolveRules = (props) => {
        this.rules = props.rules ? props.rules.split('|') : [];
    
        this.min = undefined;
        this.max = undefined;

        this.rules.forEach((r)=>{
            const regex = (/(\S+):(\w+)/).exec(r)
            const rule = regex[1];
            const target = regex[2];
            
            if(rule=='less_than'){
                const val = props.dataItem[target];
                this.max = props.max ? (val < props.max ? val : props.max) : val;
            }
            else if(rule=='greater_than'){
                const val = props.dataItem[target];
                this.min = props.min ? (val > props.min ? val : props.min) : val;
            }
        });

        //this.min = (this.min < 0 || !this.min) ? 0 : this.min;
        //this.max = (this.max > 100000000 || this.max == undefined) ? 100000000 : this.max;
    }

    componentWillReceiveProps = (nextProps) => {
        this.resolveRules(nextProps);
    } 
    
    handleFocus = (event) => {event.target.select();}

    render(){
        return  <td onFocus={this.handleFocus}>
                <NumericTextBox
                    className={_.includes(this.props.dataItem.errorField, this.props.field) ? 'input--warning' : ''}
                    value={!this.props.dataItem[this.props.field] ? 0 : this.props.dataItem[this.props.field]}
                    onChange={this.handleChange}
                    format={this.props.format}
                    max={this.props.max ? this.props.max : 100000000}
                    min={this.props.min ? this.props.min : 0}
                />
        </td>
    }
 
}

GridNumericCellTemplate.propTypes = {
    dataItem: PropTypes.object.isRequired,
    field: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default GridNumericCellTemplate;