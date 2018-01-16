import React from "react";
import { Paged } from "src/data/paginate";
import { Entity } from "src/types";

interface Props<T extends Entity> {
  page: Paged<T>;
}

interface State<T extends Entity> {
  data: T[];
  nextUrl: null;
  loading: false;
}

export function withPagination<T extends Entity>(
  Comp: React.ComponentClass<any> | React.StatelessComponent<any>
) {
  return class Paginated extends React.Component<Props<T>> {
    state: State<T> = {
      data: [],
      nextUrl: null,
      loading: false
    };

    componentWillMount() {
      const { data, next } = this.props.page;
      this.setState({
        data,
        nextUrl: next
      });
    }

    loadNext = () => {
      this.setState({
        loading: true
      });
      fetch(this.state.nextUrl)
        .then(res => {
          return res.json();
        })
        .then((res: Paged<T>) => {
          const { data, next } = res;
          this.setState({
            data: this.state.data.concat(data),
            nextUrl: next,
            loading: false
          });
        });
    };
    render() {
      const { page, ...rest } = this.props;
      console.log("PAGINATED STATE", this.state);
      return (
        <Comp
          {...rest}
          loading={this.state.loading}
          data={this.state.data}
          loadNext={this.loadNext}
          hasNext={this.state.nextUrl !== null}
        />
      );
    }
  };
}
