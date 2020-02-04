import React, { Component } from "react";

export default function Loadable(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false
      };
    }

    setIsLoading = isLoading => {
      this.setState({ isLoading });
    };

    render() {
      return (
        <>
          <div className={this.state.isLoading ? "overlay" : "hidden"} />
          <div className={this.state.isLoading ? "loader-modal" : "hidden"} />
          <WrappedComponent
            isLoading={this.state.isLoading}
            setIsLoading={this.setIsLoading}
            {...this.props}
          />
        </>
      );
    }
  };
}
