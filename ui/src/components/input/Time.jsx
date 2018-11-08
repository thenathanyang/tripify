import React from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import 'rc-time-picker/assets/index.css';

/**
 * TimeSelector represents a text field input that shows a
 * time-selection dropdown input.
 * 
 * Example:
 *  <TimeSelector
 *    name="startTime"
 *    defaultValue={moment()}
 *    onChange={(name, value) => console.log(name, value)}
 *  />
 * 
 * @author nkansal96
 * @version 1.0.0
 */
class TimeSelector extends React.Component {
  /**
   * Handle's the user selecting a new date from the dropdown.
   * 
   * @param value The `moment` date object representing the time selected
   */
  handleChange = value => this.props.onChange(this.props.name, value);

  render() {
    return (
      <div className="time-selector">
        <TimePicker
          defaultValue={this.props.defaultValue}
          inputReadOnly
          minuteStep={15}
          onChange={this.handleChange}
          showSecond={false}
          use12Hours
        />
      </div>
    );
  }
}

TimeSelector.propTypes = {
  /** Initial date to populate the TimeSelector */
  defaultValue: PropTypes.instanceOf(moment),
  /** The HTML name for the input */
  name: PropTypes.string.isRequired,
  /** The change handler for the input, with signature (name: string, value: moment) => void */
  onChange: PropTypes.func.isRequired,
};

TimeSelector.defaultProps = {
  defaultValue: null,
};

export default TimeSelector;