import React from "react";
import { withRouteData } from "react-static";
import { withPagination, PageProps } from "../components/paginated";
import { Project, Image } from "../../types/index";
import { noOp } from "../no-op";

function unwrapImages(data: Project[]) {
  return data.map(item => {
    const firstImage = item.media.find(m => m.itemType === "image");
    return firstImage as Image;
  });
}

const PageSection: React.SFC<PageProps<Project>> = props => {
  const { data, loading, loadNext, hasNext } = props;
  const galleryItems = unwrapImages(data).map((img, i) => {
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
      <div>loadmore</div>
      <div style={{ width: "1300px" }}>{galleryItems}</div>
      {loading ? (
        <div style={{ paddingTop: "100px" }}>Loading next page...</div>
      ) : (
        <div style={{ paddingTop: "100px" }}>
          <button
            style={{ width: "100px", height: "50px" }}
            onClick={hasNext ? loadNext : noOp}
          >
            {hasNext ? "Load more" : "No more pages to load"}
          </button>
        </div>
      )}
    </div>
  );
};

export default withRouteData(withPagination(PageSection));
