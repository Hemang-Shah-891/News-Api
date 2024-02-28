import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
// import { Router } from "react-router-dom";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=837dd0e1548e4aeda9edabb8a3f9f6e5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      ...this.state,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  async componentDidMount() {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=837dd0e1548e4aeda9edabb8a3f9f6e5&page=1&pageSize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //   });
    this.updateNews();
  }
  render() {
    const handlePrevClick = async () => {
      console.log("Previous");

      // let url = `https://newsapi.org/v2/top-headlines?country=${
      //   this.props.country
      // }&category=${
      //   this.props.category
      // }&apiKey=837dd0e1548e4aeda9edabb8a3f9f6e5&page=${
      //   this.state.page - 1
      // }&pageSize=${this.props.pageSize}`;
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // console.log(parsedData);
      // this.setState({
      //   page: this.state.page - 1,
      //   articles: parsedData.articles,
      // });

      this.setState({ ...this.state, page: this.state.page - 1 });
      this.updateNews();
    };

    const handleNextClick = async () => {
      console.log("Next");
      // if (
      //   this.state.page + 1 >
      //   Math.ceil(this.state.totalResults / this.props.pageSize)
      // ) {
      // } else {
      //   let url = `https://newsapi.org/v2/top-headlines?country=${
      //     this.props.country
      //   }&category=${
      //     this.props.category
      //   }&apiKey=837dd0e1548e4aeda9edabb8a3f9f6e5&page=${
      //     this.state.page + 1
      //   }&pageSize=${this.props.pageSize}`;
      //   let data = await fetch(url);
      //   let parsedData = await data.json();
      //   console.log(parsedData);
      //   this.setState({
      //     page: this.state.page + 1,
      //     articles: parsedData.articles,
      //   });
      // }

      this.setState({ ...this.state, page: this.state.page + 1 });
      this.updateNews();
    };

    return (
      <div className="container my-3">
        <h1
          className="text-center"
          style={{ margin: "35px 0px", marginTop: "90px" }}
        >
          Times of News - Top Headlines
        </h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  // source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
