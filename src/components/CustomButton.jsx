import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';

const CustomButton = styled((props) => <Button {...props} />)`
  background-color: #6b5c43 !important;
  border-color: #6b5c43 !important;
`;

export default CustomButton;
