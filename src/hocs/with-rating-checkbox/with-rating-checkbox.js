import React, {PureComponent} from 'react';

const withRatingCheckbox = (Component) => {
  class WithRatingCheckbox extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: ``,
        review: ``,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.resetState = this.resetState.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      console.log(target.checked);

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
        rating = {this.state.rating}
        review = {this.state.review}
        handleInputChange={this.handleInputChange}
        resetState={this.resetState}
      />;
    }
  }
  WithRatingCheckbox.propTypes = {};

  return WithRatingCheckbox;
};

export default withRatingCheckbox;
