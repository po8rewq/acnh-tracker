import React from 'react';
import PropTypes from 'prop-types';
import icons from '../data/img/bugs'

const iconNames = Object.keys(icons);

const propTypes = {
  icon: PropTypes.oneOf(iconNames)
}

const BugIcons = (props) => <><img src={icons[props.icon]} alt={props.icon} /></>

BugIcons.propTypes = propTypes;

export default BugIcons;