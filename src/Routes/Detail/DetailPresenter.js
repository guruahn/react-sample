import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Loader from "Components/Loader";
import {Link} from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: -29px;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center, center;
  background-size: cover;
  filter: blur(5px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;
const Cover = styled.img`
  max-width: 50%;
  height: auto;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;
const ItemContainer = styled.div`
  margin: 20px 0; 
`;
const Item = styled.span``;
const Divider = styled.span`
  margin: 0 10px;
`;
const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const CollectionContainer = styled.div`
  margin-top: 30px;
`;
const CollectionTitle = styled.h3`
  margin: 10px 0;
  font-size: 18px;
`;
const Collection = styled.img`
  width: 100px;
`;

const DetailPresenter = ({ result, loading, error, isMovie }) => (
  <HelmetProvider>
    {loading || !result ? (
      <>
        <Helmet>
          <title>Search | Nomfilx</title>
        </Helmet>
        <Loader />
      </>
    ) : (
      <Container>
        <Helmet>
          <title>
            {result.original_title
              ? result.original_title
              : result.original_name}{" "}
            | Nomfilx
          </title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        ></Backdrop>
        <Content>
          <Cover
            src={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.png").default
            }
          ></Cover>
          <Data>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time}min
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
              <Divider>•</Divider>
              <Item>
                <a
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  IMDb
                </a>
              </Item>
              <Divider>•</Divider>
              <Item>
                <span role="img" aria-label="rating">
                  🌟
                </span>{" "}
                {result.vote_average}/10
              </Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
            {result.belongs_to_collection ? (
              <CollectionContainer>
                <CollectionTitle>
                  {result.belongs_to_collection.name}
                </CollectionTitle>
                <Link to={`/collection/${result.belongs_to_collection.id}`}>
                  <Collection
                    src={`https://image.tmdb.org/t/p/original${result.belongs_to_collection.poster_path}`}
                  />
                </Link>
              </CollectionContainer>
            ) : (
              ""
            )}
          </Data>
        </Content>
      </Container>
    )}
  </HelmetProvider>
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default DetailPresenter;
