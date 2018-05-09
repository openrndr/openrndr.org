import * as React from "react";
import fetchp from "fetch-jsonp";
import { InstaPost } from "../../types/index";

export interface InstaJson {
  version: string;
  title: string;
  author_name: string;
  author_url: string;
  author_id: number;
  media_id: string;
  provider_name: string;
  provider_url: string;
  type: string;
  width: number;
  height?: any;
  html: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
}

interface IState {
  loading: boolean;
  data: InstaJson | null;
  error: boolean;
}

interface IProps {
  link: string;
}

import "./style.css";

export class InstaImage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      error: false
    };
  }

  componentWillMount() {
    if (typeof window !== "undefined") {
      const API = "https://api.instagram.com/oembed/?url=";
      const url = `${API}${this.props.link}`;
      fetchp(url)
        .then(res => {
          return res.json();
        })
        .then(json => {
          this.setState({
            loading: false,
            data: json,
            error: false
          });
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false,
            data: null
          });
        });
    }
  }

  handleImageError = () => {
    console.warn("failed to load image", this.props.link);
  };

  render() {
    const { data } = this.state;

    return (
      <div className={`insta-post`}>
        <a href={this.props.link} target={"_blank"}>
          <img
            width="100%"
            src={data ? data.thumbnail_url : ""}
            onError={this.handleImageError}
          />
        </a>
        {data && (
          <article>
            <p>
              <span>{data.title}</span>
              <br />
              <span>
                <a target="_blank" href={data.author_url}>
                  @{data.author_name}
                </a>
              </span>
            </p>
          </article>
        )}
      </div>
    );
  }
}
