import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activCard: 1,
      };
    }

    render() {
      // const {activCard} = this.state;

      return <Component
        {...this.props}
        onUserHover={(id) => {
          this.setState({activCard: id});
        }}
        // renderPlayer={(it, i) => {
        //   return <AudioPlayer
        //     src={it.src}
        //     isPlaying={i === activePlayer}
        //     onPlayButtonClick={() => this.setState((prevState) => ({
        //       activePlayer: prevState.activePlayer === i ? -1 : i
        //     }))}
        //   />;
        // }}
      />;
    }
  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
