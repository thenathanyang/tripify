import React from 'react';
import PropTypes from 'prop-types';
import TimeSelector from './Time';
import Icon from 'components/icon';

import moment from 'moment';

/**
 * TimeRange is a component that combines two TimeSelectors
 * to display and select a range of time.
 * 
 * Example:
 *  <TimeRange
 *    name="eventTimeRange"
 *    defaultEndTime={moment()}   // optional
 *    defaultStartTime={moment()} // optional
 *    onChange={(name, start, end) => console.log(name, start, end)}
 *  />
 * 
 * @author nkansal96
 * @version 1.0.0
 */
class TimeRange extends React.Component {
  /**
   * Constructs the TimeRange and sets the state variables to initially
   * be derived from their corresponding props
   * 
   * @param {TimeRange.propTypes} props the initial props to the component
   */
  constructor(props) {
    super(props);
    this.state = {
      startTime: props.defaultStartTime,
      endTime: props.defaultEndTime,
    };
  }

  /**
   * Handles the user changing the start time in the time range.
   * 
   * @param {string} name the name of the input field that changed
   * @param {moment} startTime the object representing the start time selected
   */
  handleStartTimeChange = (name, startTime) =>
    this.setState({ startTime }, () =>
      this.props.onChange(this.props.name, startTime, this.state.endTime));

  /**
   * Handles the user changing the end time in the time range.
   * 
   * @param {string} name the name of the input field that changed
   * @param {moment} endTime the object representing the end time selected
   */
  handleEndTimeChange = (name, endTime) =>
    this.setState({ endTime }, () =>
      this.props.onChange(this.props.name, this.state.startTime, endTime));
  
  render() {
    const { defaultEndTime, defaultStartTime, name } = this.props;
    const startName = `${name}_start`;
    const endName = `${name}_end`;
    return (
      <div className="time-range">
        <TimeSelector
          defaultTime={defaultStartTime}
          name={startName}
          onChange={this.handleStartTimeChange}
          disabled={this.props.disabled}
        />
        <Icon color="gray" icon="arrow-right" />
        <TimeSelector
          defaultTime={defaultEndTime}
          name={endName}
          onChange={this.handleEndTimeChange}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

TimeRange.propTypes = {
  /** Initial date to populate the end TimeSelector */
  defaultEndTime: PropTypes.instanceOf(moment),
  /** Initial date to populate the start TimeSelector */
  defaultStartTime: PropTypes.instanceOf(moment),
  /** The HTML name for the input */
  name: PropTypes.string.isRequired,
  /** The change handler for the input, with signature (name: string, start: moment, end: moment) => void */
  onChange: PropTypes.func.isRequired,
  /** Boolean corresponding to whether time selection is disabled*/
  disabled: PropTypes.bool
};

TimeRange.defaultProps = {
  defaultEndTime: null,
  defaultStartTime: null,
  disabled: false
};

export default TimeRange;