import React from 'react';
import PropTypes from 'prop-types';
import icons from '../../data/img/bugs';

const iconNames = Object.keys(icons);

const propTypes = {
  icon: PropTypes.oneOf(iconNames).isRequired,
};

const BugIcons = ({ icon }) => <><img src={icons[icon]} alt={icon} /></>;

BugIcons.propTypes = propTypes;

export default BugIcons;
