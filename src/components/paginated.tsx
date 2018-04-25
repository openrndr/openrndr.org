import React from "react";
import { Entity, Paged } from "../types/index";

interface Props<T extends Entity> {
  page: Paged<T>;
  title: string;
}

interface State<T extends Entity> {
  data: T[];
  nextUrl: string | null;
  loading: false;
}

export interface PageProps<T extends Entity> {
  loading: boolean;
  data: T[];
  loadNext: () => any;
  hasNext: boolean;
}

export function withPagination<T extends Entity>(
  Comp: React.ComponentClass<any> | React.StatelessComponent<any>
) {
  return class Paginated extends React.Component<Props<T>, State<T>> {

    constructor(props: Props<T>){
      super(props);
      this.state = {
        data: [],
        nextUrl: null,
        loading: false
      }
    }

    componentWillMount() {
      const { data, next } = this.props.page;
      this.setState({
        data,
        nextUrl: next
      });
    }

    loadNext = () => {
      if (this.state.nextUrl) {
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
      }
    };

    render() {
      const { page, ...rest } = this.props;
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