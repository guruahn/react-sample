import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Loader from "Components/Loader";
import { Link } from "react-router-dom";
import Poster from "Components/Poster";

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
const Title = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
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

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const CollectionContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 175px);
  grid-gap: 25px;
`;

const CollectionPresenter = ({ result, loading, error, isMovie }) => (
  <HelmetProvider>
    {loading ? (
      <>
        <Helmet>
          <title>Collection | Nomfilx</title>
        </Helmet>
        <Loader />
      </>
    ) : (
      <Container>
        <Helmet>
          <title>{result.name}" | Nomfilx"</title>
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
            <Title>{result.name}</Title>
            <Overview>{result.overview}</Overview>
            <CollectionContainer>
              {result.parts.map((part) => (
                <Poster
                  id={part.id}
                  title={part.original_title}
                  imageUrl={part.poster_path}
                  rating={part.vote_average}
                  isMovie={true}
                  year={
                    part.release_date && part.release_date.substring(0, 4)
                  }
                />
              ))}
            </CollectionContainer>
          </Data>
        </Content>
      </Container>
    )}
  </HelmetProvider>
);

CollectionPresenter.propTypes = {
  result: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default CollectionPresenter;
