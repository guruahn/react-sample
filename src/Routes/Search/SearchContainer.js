import React from "react";
import SearchPresenter from "./SearchPresenter";
import { movieApi, tvApi } from "api";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "code",
    error: null,
    loading: true,
  };

  componentDidMount(){
    
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    const { searchTerm } = this.state;
    if(searchTerm !== "") {
      this.searchByTerm();
    }
  }

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    try {
      const { data: {results: movieResults}} = await movieApi.search(searchTerm);
      const { data: {results: tvResults}} = await tvApi.search(searchTerm);
      this.setState({movieResults, tvResults})
    } catch (error) {
      this.setState({ error: "Can't find results." });
    }finally{
      this.setState({ loading: false })
    }
  }

  updateTerm = (event) => {
    const {target: {value}} = event;
    this.setState({ searchTerm: value})
  }

  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
console.log(this.state)
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
