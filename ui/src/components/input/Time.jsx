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
  constructor(props) {
    super(props);
    this.state = {
      showing: true,
    }
  }

  /**
   * Handle the user selecting a new date from the dropdown.
   * 
   * @param {moment} time The object representing the time selected
   */
  handleChange = time => this.props.onChange(this.props.name, time);

  /**
   * Force the view to refresh
   */
  componentDidUpdate(prevProps) {
    if (!prevProps.defaultTime || !this.props.defaultTime || (prevProps.defaultTime.unix() !== this.props.defaultTime.unix())) {
      this.setState({ showing: false }, () =>
        setTimeout(() => this.setState({ showing: true }), 0));
    }
  }

  getDefaultView = () =>
    <div className="time-selector empty" />

  getTimeView = () =>
    <div className="time-selector">
      <TimePicker
        defaultValue={this.props.defaultTime}
        inputReadOnly
        minuteStep={15}
        onChange={this.handleChange}
        showSecond={false}
        use12Hours
        disabled={this.props.disabled}
      />
    </div>

  render() {
    return this.state.showing ? this.getTimeView() : this.getDefaultView();
  }
}

TimeSelector.propTypes = {
  /** Initial date to populate the TimeSelector */
  defaultTime: PropTypes.instanceOf(moment),
  /** Boolean corresponding to whether input is disabled */
  disabled: PropTypes.bool,
  /** The HTML name for the input */
  name: PropTypes.string,
  /** The change handler for the input, with signature (name: string, time: moment) => void */
  onChange: PropTypes.func.isRequired,
};

TimeSelector.defaultProps = {
  defaultTime: null,
  disabled: false,
  name: undefined,
};

export default TimeSelector;
