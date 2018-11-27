import React from 'react';
import PropTypes from 'prop-types';
import Tab from './tab';

export default class TabController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  handleUpdate = i => {
    this.setState({ selectedTab: i }, () => this.props.onChange(i));
  }

  render() {
    return (
      <div className="tab-controller">
        <div className="tab-controller-inner">
          {this.props.tabs.map((tab, i) => 
            <Tab key={tab} name={tab} selected={this.state.selectedTab === i} onClick={() => this.handleUpdate(i)} />
          )}
        </div>
      </div>
    )
  }
}
