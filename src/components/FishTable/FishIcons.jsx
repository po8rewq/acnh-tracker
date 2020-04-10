import React from 'react';
import PropTypes from 'prop-types';
import icons from '../../data/img/fish';

const iconNames = Object.keys(icons);

const propTypes = {
  icon: PropTypes.oneOf(iconNames).isRequired,
};

const FishIcons = ({ icon }) => <><img src={icons[icon]} alt={icon} /></>;

FishIcons.propTypes = propTypes;

export default FishIcons;
