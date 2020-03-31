import React from 'react';
import PropTypes from 'prop-types';
import icons from '../data/img/fish'

const iconNames = Object.keys(icons);

const propTypes = {
  icon: PropTypes.oneOf(iconNames)
}

const FishIcons = (props) => <><img src={icons[props.icon]} alt={props.icon} /></>

FishIcons.propTypes = propTypes;

export default FishIcons;