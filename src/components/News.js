import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
  // Default props
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  // Prop types
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  // Capitalize the first letter of a string
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Hello, I am a constructor from News component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0,
      totalResults: 0
    };
  }

  componentDidMount() {
    this.fetchNews();
    // Setting the document title
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News React`;
  }

  fetchNews = async () => {
    this.props.setProgress(10); // Start loading bar
    this.setState({ loading: true });
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=21466db08f594d33bb4482766104dc6a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      this.props.setProgress(50); // Update loading bar to 50%
      let parsedData = await data.json();
      this.props.setProgress(75); // Update loading bar to 75%
      this.setState({
        articles: parsedData.articles,
        loading: false,
        totalArticles: parsedData.totalResults
      });
      this.props.setProgress(100); // Complete loading bar
      console.log(parsedData);
    } catch (error) {
      console.error("Error fetching the news data:", error);
      this.setState({ loading: false });
      this.props.setProgress(100); // Complete loading bar even on error
    }
  };

  handlePreviousClick = async () => {
    this.setState(
      { page: this.state.page - 1 },
      this.fetchNews
    );
  };

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalArticles / this.props.pageSize)) {
      this.setState(
        { page: this.state.page + 1 },
        this.fetchNews
      );
    }
  };

  fetchMoreData = async () => {
    this.props.setProgress(10); // Start loading bar
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=21466db08f594d33bb4482766104dc6a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(50); // Update loading bar to 50%
    let parsedData = await data.json();
    this.props.setProgress(75); // Update loading bar to 75%
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults
    });
    this.props.setProgress(100); // Complete loading bar
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px",marginTop:"90px"}}>
          News React - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className="row">
              {this.state.articles.map((element) => (
                <div className='col-md-4' key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imageurl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
