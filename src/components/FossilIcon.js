import React from 'react';
import PropTypes from 'prop-types';
import icons from '../data/img/fossils'

const iconNames = Object.keys(icons);

const propTypes = {
  icon: PropTypes.oneOf(iconNames)
}

const FossilIcons = (props) => <><img src={icons[props.icon]} alt={props.icon} /></>

FossilIcons.propTypes = propTypes;

export default FossilIcons;