import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button as BeeButton, Icon } from 'tinper-bee';
import './index.scss'

interface IProps  {
    iconType:string,
    className?:string,
    style?:any,
    disabled?:boolean,
    authority?:boolean,
    isAction?:boolean
};

class Button extends Component<any> {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() { }

    render() {
        let { className,
            style,
            iconType,
            disabled,
            authority,
            isAction = false,
            ...other
        } = this.props;
        // let classname = className||'';
        let classname = (disabled && authority) && `${className || ''} btn-authority-disabled` || `${className || ''}`;
        if (isAction) {
            classname += ' action-button'
        }
        return (
            <BeeButton
                className={'bs-button ' + classname}
                size="sm"
                style={{ ...style }}
                disabled={disabled}
                {...other} >
                {iconType ? (
                    <Icon className={iconType} />
                ) : null}
                {this.props.children}
            </BeeButton>
        )
    }
}

export default Button;
