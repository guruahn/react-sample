import React from "react";
import TVPresenter from "./TVPresenter";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    airingToday: null,
    popular: null,
    error: null,
    loading: true,
  };

  render() {
    const { nowPlaying, airingToday, popular, error, loading } = this.state;
    return (
      <TVPresenter
        nowPlaying={nowPlaying}
        airingToday={airingToday}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
