import React from "react";
import {prefetch} from "react-static";
import {Location} from "history";


interface State {
  isInitialDataFetched: boolean;
  data: any;
}

interface Props {
  location: Location;
}

export default class Home extends React.Component<Props, State>{
  state: State = {
    isInitialDataFetched: false,
    data: []
  };
  componentWillMount() {
    prefetch("/data")
        .then(({initialProps}: any)=>{
          this.setState({
            isInitialDataFetched: true,
            data: initialProps
          })
        })
  }
  render(){
    if(!this.state.data) return null;

    //use the pathname to set the scroll position
    console.log(this.props.location.pathname);

    return(
        <div className="sweet-home">
          <strong>Page/Section 1<br/></strong>
          <strong>Page/Section 2<br/></strong>
          <strong>Page/Section 3<br/></strong>
          <strong>Page/Section 4<br/></strong>
          <strong>Page/Section 5<br/></strong>
        </div>
    )
  }
}