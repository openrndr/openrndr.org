import React from "react";
import {
  // getSiteProps,
  getRouteProps
} from "react-static";
import { Paged } from "src/data/paginate";
import { GalleryItem, Image } from "src/types";

interface Props {
  gallery: Paged<GalleryItem>;
}

interface State {
  images: Image[];
  nextUrl: string | null;
  loading: boolean;
}

function unwrapImages(page: Paged<GalleryItem>) {
  return page.data.map(item => {
    const firstImage = item.media.find(m => m.itemType === "image");
    return firstImage as Image;
  });
}

class Home extends React.Component<Props, State> {
  state: State = {
    images: [],
    nextUrl: null,
    loading: false
  };

  componentWillMount() {
    const images = unwrapImages(this.props.gallery);
    const nextUrl = this.props.gallery.next;
    this.setState({ images, nextUrl });
  }

  loadMore = () => {
    console.log("calling", this.state.nextUrl);
    this.setState({
      loading: true
    });
    fetch(this.state.nextUrl)
      .then(res => {
        return res.json();
      })
      .then((res: Paged<GalleryItem>) => {
        const images = unwrapImages(res);
        const nextUrl = res.next;
        const newState = {
          images: this.state.images.concat(images),
          nextUrl
        };
        console.log("new state", newState);
        this.setState(newState);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const galleryItems = this.state.images.map((img, i) => {
      return (
        <div
          key={i}
          style={{
            height: "300px",
            width: "300px",
            padding: "10px",
            display: "inline-block"
          }}
        >
          <img style={{ width: "100%" }} src={img.file.url} />
          <div>{img.id}</div>
        </div>
      );
    });
    return (
      <div>
        <div style={{ width: "1300px" }}>{galleryItems}</div>
        {this.state.loading ? (
          <div style={{ paddingTop: "100px" }}>Loading next page...</div>
        ) : (
          <div style={{ paddingTop: "100px" }}>
            <button
              style={{ width: "100px", height: "50px" }}
              onClick={this.loadMore}
            >
              {this.state.nextUrl !== null
                ? "Load more"
                : "No more pages to load"}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default getRouteProps(Home);
