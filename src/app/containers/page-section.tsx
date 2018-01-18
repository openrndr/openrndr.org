import React from "react";
import { getRouteProps } from "react-static";
import { withPagination, PageProps } from "../components/paginated";
import { Project, Image } from "../../types/index";

interface Props {
  foo: string;
}

function unwrapImages(data: Project[]) {
  return data.map(item => {
    const firstImage = item.media.find(m => m.itemType === "image");
    return firstImage as Image;
  });
}

const pageSection = (props: Props & PageProps<Project>) => {
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
            onClick={hasNext ? loadNext : null}
          >
            {hasNext ? "Load more" : "No more pages to load"}
          </button>
        </div>
      )}
    </div>
  );
};

export default getRouteProps(withPagination(pageSection));
