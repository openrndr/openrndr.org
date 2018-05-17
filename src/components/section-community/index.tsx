import * as React from "react";

import { Community, Question } from "../../types";
import "./style.css";
import { TextBlock } from "../text-block/index";

interface IProps {
  data: Community;
}

interface IState {
  openQuestionIndex: number;
}

export class SectionCommunity extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      openQuestionIndex: -1
    };
  }

  setQuestion = (index: number) => {
    const { openQuestionIndex } = this.state;

    if (openQuestionIndex === index) {
      this.setState({
        openQuestionIndex: -1
      });
    } else {
      this.setState({
        openQuestionIndex: index
      });
    }
  };

  render() {
    const { data } = this.props;
    const { openQuestionIndex } = this.state;

    return (
      <section className={`xx-x-x`}>
        <div className="text-block">
          <h3>FAQ</h3>
          <br />
          {data.faq.map((q: Question, i: number) => (
            <div
              className={`question ${openQuestionIndex === i ? "open" : ""}`}
              key={`q-${i}`}
            >
              <strong
                className={"question-title button"}
                onClick={() => this.setQuestion(i)}
              >
                {q.question}
              </strong>
              <article
                className={"answer"}
                dangerouslySetInnerHTML={{
                  __html: q.answer
                }}
              />
            </div>
          ))}
        </div>
        {data.contentBlocks.map((cb, i) => (
          <TextBlock
            key={`text-block${i}`}
            data={cb}
            className={i === 0 ? "faq" : ""}
          />
        ))}
      </section>
    );
  }
}
