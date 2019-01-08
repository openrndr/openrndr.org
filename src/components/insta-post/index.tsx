import * as React from "react";
import { Fade } from "react-reveal";
import axios, { AxiosResponse } from "axios";

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
      axios({
        url,
        method: "get",
        responseType: "json"
      })
        .then((res: AxiosResponse<InstaJson>) => {
          return res.data;
        })
        .then((json: InstaJson) => {
          this.setState({
            loading: false,
            data: json,
            error: false
          });
        })
        .catch((err: Error) => {
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
    const { data, error } = this.state;

    if (error || !data) {
      // console.log("error loading insta post", error);
      return null;
    }

    return (
      <Fade clear>
        <div className={`insta-post`}>
          <div className={"media-item"}>
            <a href={this.props.link} target={"_blank"}>
              <div
                style={{
                  // height: data.thumbnail_height < data.thumbnail_width ? "100%": "auto",
                  // width:  data.thumbnail_height < data.thumbnail_width ? "auto" : "auto",
                  background: `url(${data ? data.thumbnail_url : ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%"
                }}
                onError={this.handleImageError}
              />
            </a>
          </div>
          {data && (
            <div className="article">
              <p>
                <span>{data.title}</span>
                <br />
                <span>
                  <a target="_blank" href={data.author_url}>
                    @{data.author_name}
                  </a>
                </span>
              </p>
            </div>
          )}
        </div>
      </Fade>
    );
  }
}
