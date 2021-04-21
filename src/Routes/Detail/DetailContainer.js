import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi, collectionApi } from "api";


export default class extends React.Component {
  constructor(props){
    super(props);
    const {location: {pathname}} = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      isShow: pathname.includes("/show/")
    };
  }

  
  async componentDidMount(){
    const {
      match: { params: {id} },
      history: { push },
      location: {pathname}
    } = this.props;
    const { isMovie, isShow } = this.state;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return push("/");
    let result;
    try {
      if(isMovie) {
        ({data: result} = await movieApi.movieDetail(parsedId));
      }else if(isShow){
        ({ data: result } = await tvApi.showDetail(parsedId));
      }else{
        ({ data: result } = await collectionApi.showDetail(parsedId));
      }
    } catch (error) {
      this.setState({error: "Can't find movie", result})
    }finally{
      this.setState({loading: false, result})
    }

  }
  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
