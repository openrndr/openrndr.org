import * as React from "react";

export const SectionWrapper: React.SFC<{
  id: string;
  color: string;
  title?: string;
  onTitleClick?: () => void;
  className?: string;
}> = props => {
  const {
    children,
    id,
    color,
    title,
    onTitleClick = () => {},
    className = ""
  } = props;
  return (
    <section
      className={`section-wrapper ${className}`}
      id={id}
      style={{
        borderBottom: id === "calendar" ? `1px solid ${color}` : "none"
      }}
    >
      {title && (
        <div
          className={"section-title"}
          style={{
            borderBottom: `1px solid ${color}`,
            borderTop: `1px solid ${color}`
          }}
        >
          <div className={"gap"} />
          <h1 onClick={onTitleClick}>{title}</h1>
          <div className={"gap"} />
        </div>
      )}
      <div className={"section-body"}>
        <div className={"gap"} />
        {children}
        <div className={"gap"} />
      </div>
    </section>
  );
};
