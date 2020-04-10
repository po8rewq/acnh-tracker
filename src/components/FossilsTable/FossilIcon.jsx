import React from 'react';
import PropTypes from 'prop-types';
import icons from '../../data/img/fossils';

const iconNames = Object.keys(icons);

const propTypes = {
  icon: PropTypes.oneOf(iconNames).isRequired,
};

const FossilIcons = ({ icon }) => <><img src={icons[icon]} alt={icon} /></>;

FossilIcons.propTypes = propTypes;

export default FossilIcons;
