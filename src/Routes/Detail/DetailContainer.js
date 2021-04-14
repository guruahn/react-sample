import React from "react";
import HomePresenter from "./HomePresenter";

export default class extends React.Component {
  state = {
    result: null,
    error: null,
    loading: true,
  };

  render() {
    const { result, error, loading } = this.state;
    return (
      <HomePresenter
        result={result}
        error={error}
        loading={loading}
      />
    );
  }
}
