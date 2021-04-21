import React from "react";
import CollectionPresenter from "./CollectionPresenter";
import { collectionApi } from "api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
      location: { pathname },
    } = this.props;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return push("/");
    let result;
    try {
      ({ data: result } = await collectionApi.showDetail(parsedId));
      console.log(result);
    } catch (error) {
      this.setState({ error: "Can't find movie", result });
    } finally {
      this.setState({ loading: false, result });
    }
  }
  render() {
    const { result, error, loading } = this.state;
    return <CollectionPresenter result={result} error={error} loading={loading} />;
  }
}
