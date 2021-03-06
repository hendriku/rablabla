import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classList: 'normal',
      selected: false,
    }; // 'normal' is default, other values: 'medium', 'small', 'tiny'
  }

  update = () => {
    if (this.liElement) {
      const height = this.liElement.clientHeight;
      const classList = this.state.classList.split(' ');
      let size = '';
      if (height < 70) {
        size = 'tiny';
      } else if (height < 160) {
        size = 'small';
      } else if (height < 190) {
        size = 'medium';
      } else {
        size = 'normal';
      }
      classList[0] = size;
      this.setState({ classList: classList.join(' ') });
    }
  }

  setSelection = (val) => {
    this.setState({ selected: val });
  };

  handleClick = () => {
    this.props.showBackdrop(this.setSelection);
  }

  componentDidMount() {
    this.update();
    window.addEventListener('resize', this.update);
  }

  render() {
    const { startTime, endTime, course, persons, resources, height, width, top, left }
      = this.props.data;
    const { selected, classList } = this.state;
    return (
      <li
        style={{ height, width, top, left }}
        className={`event ${classList} ${selected ? 'selected' : ''}`}
        ref={liElement => this.liElement = liElement}
        onClick={this.handleClick}
      >
        <p className="event--time">{`${startTime} - ${endTime}`}</p>
        <h3 className="event--header">{course}</h3>
        <p className="event--body">{persons}</p>
        <p className="event--footer">{resources}</p>
      </li>
    );
  }
}

Event.propTypes = {
  data: PropTypes.object.isRequired,
  showBackdrop: PropTypes.func.isRequired,
};
