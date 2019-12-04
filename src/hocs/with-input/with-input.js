import React, {PureComponent} from 'react';

const withInput = (Component) => {
  class WithInput extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        // rating: ``,
        // review: ``,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.resetState = this.resetState.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value});
    }

    resetState() {
      this.setState({
        rating: ``,
        review: ``,
      });
    }

    render() {
      return <Component
        {...this.props}
        // rating = {this.state.rating}
        // review = {this.state.review}
        state = {this.state}
        handleInputChange={this.handleInputChange}
        resetState={this.resetState}
      />;
    }
  }
  WithInput.propTypes = {};

  return WithInput;
};

export default withInput;
