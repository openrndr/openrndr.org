import React from "react";
import styled from "styled-components";
import {Event} from "../../types";

const Container = styled.div`
background: pink;
`

interface Props {
    event : Event;
}

export default (props: Props) => {
    return (
        <Container>
            <div><u>{props.event.title}</u></div>
            <div>{props.event.note}</div>
            <div><a href={props.event.link}>Event page</a></div>
            <hr/>
        </Container>
    );
};
