import React from 'react';
import PropTypes from 'prop-types';

/**
 * PasswordInput represents a regular password input field.
 * 
 * Example:
 *  <PasswordInput
 *    name="email"
 *    onChange={(name, value) => console.log(name, value)}
 *  />
 * 
 * @author nkansal96
 * @version 1.0.0
 */
class PasswordInput extends React.Component {
  /**
   * Handle's the user typing into the field and calls the passed in function
   * to handle the change.
   * 
   * @param {React.ChangeEvent<HTMLElement>} e The event triggered by a user typing into the field
   */
  handleChange = e => this.props.onChange(e.target.name, e.target.value);

  render() {
    return (
      <input {...this.props} autoComplete="off" type="password" onChange={this.handleChange} />
    );
  }
}

PasswordInput.propTypes = {
  /** The HTML name for the input */
  name: PropTypes.string.isRequired,
  /** The change handler for the input, with signature (name: string, value: string) => void */
  onChange: PropTypes.func.isRequired,
};

export default PasswordInput;
