import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <div className={s.Overlay} onClick={this.handleCloseModal}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>
    );
  }
}
