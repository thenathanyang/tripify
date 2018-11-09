import React from 'react';
import PropTypes from 'prop-types';

/**
 * TextInput represents a regular text input field.
 * 
 * Example:
 *  <TextInput
 *    name="email"
 *    defaultValue="optional initial value"
 *    placeholder="optional text to display when input is empty"
 *    onChange={(name, value) => console.log(name, value)}
 *  />
 * 
 * @author nkansal96
 * @version 1.0.0
 */
class TextInput extends React.Component {
  /**
   * Handle's the user typing into the field and calls the passed in function
   * to handle the change.
   * 
   * @param {React.ChangeEvent<HTMLElement>} e The event triggered by a user typing into the field
   */
  handleChange = e => this.props.onChange(e.target.name, e.target.value);

  render() {
    return (
      <input {...this.props} type="text" onChange={this.handleChange} />
    );
  }
}

TextInput.propTypes = {
  /** Initial value to populate the TextInput */
  defaultValue: PropTypes.string,
  /** The HTML name for the input */
  name: PropTypes.string.isRequired,
  /** The change handler for the input, with signature (name: string, value: string) => void */
  onChange: PropTypes.func.isRequired,
  /** The text to display when the input is empty */
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  defaultValue: '',
  placeholder: '',
};

export default TextInput;
