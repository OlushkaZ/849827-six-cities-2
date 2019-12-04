import React, {PureComponent} from 'react';

const withInnerElement = (ExternalComponent) => {
  class WithInnerElement extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isElementOpen: false,
      };
    }

    render() {
      // const {activCard} = this.state;
      // export const withLayout = Component => {
      //   return props => (
      //     <Layout>
      //       <Component {...props} />
      //     </Layout>
      //   );
      // };
      return <ExternalComponent
        {...this.props}
        isElementOpen = {this.state.isElementOpen}
        handleSortClick={() => {
          this.setState({isElementOpen: !this.state.isElementOpen});
        }}>
      </ExternalComponent>;
    }
  }

  WithInnerElement.propTypes = {};

  return WithInnerElement;
};

export default withInnerElement;
