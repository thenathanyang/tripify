import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import PropTypes from 'prop-types';
import moment from 'moment';
import {formatDate,parseDate,} from 'react-day-picker/moment';

import 'react-day-picker/lib/style.css';

/**
 * DatePicker represents a clickable calendar that allows users to select a date
 *
 * Example:
 *  <DatePicker
 *    name="selected-date"
 *    defaultValue={moment()}
 *    onChange={(name, value) => console.log(name, value)}
 * />
 *
 */

class DatePicker extends React.Component {
  /**
   * Format of all dates to be in month, date, then year
   */
  format = "MM/DD/YYYY";

  /**
   * Handle the new date either clicked or typed by the user
   *
   * @param date The `moment` date object representing the date selected
   */
  handleClick = date => this.props.onChange(this.props.name, moment(date));

  render() {
    return (
      <div className="date-picker">
        <DayPickerInput
          formatDate={formatDate}
          parseDate={parseDate}
          value={this.props.defaultValue != null 
                  ? formatDate(this.props.defaultValue, this.format)
                  : '' }
          placeholder={formatDate(moment(), this.format) }
          onDayChange={this.handleClick}
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  /** Default date of the date picker */
  defaultValue: PropTypes.instanceOf(moment),
  /** The HTML name for the input */
  name: PropTypes.string.isRequired, 
  /** The change handler for the input */
  onChange: PropTypes.func.isRequired,
}

DatePicker.defaultProps = {
  defaultValue: null,
}

export default DatePicker;
