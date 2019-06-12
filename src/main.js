import ReactDOM from "react-dom";
import React from "react";
import "./assets/app.css";

class Todo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      list: ["1", "2"],
      curEdit: undefined,
    };
  }
  onInput(e) {
    const text = e.target.value;
    if (e.key === "Enter" && text) {
      e.target.value = "";
      this.state.list.push(text);
      this.setState({
        list: this.state.list,
      });
    }
  }
  onRemove(i, e) {
    e.stopPropagation();
    this.state.list.splice(i, 1);
    this.setState({
      list: this.state.list,
    });
  }

  onSpanClick(i) {
    this.setState({
      curEdit: i,
    });
  }
  onChange(i, e) {
    this.state.list[i] = e.target.value;
    this.setState({
      list: this.state.list,
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.list.map((item, i) => (
            <li key={i}>
              {this.state.curEdit !== i && (
                <span onClick={() => this.onSpanClick(i)}>
                  {item}{" "}
                  <i className="close" onClick={e => this.onRemove(i, e)}>
                    x
                  </i>
                </span>
              )}
              {this.state.curEdit === i && (
                <input
                  placeholder="请输入事项"
                  value={item}
                  onChange={e => this.onChange(i, e)}
                  onBlur={() => this.setState({ curEdit: undefined })}
                />
              )}
            </li>
          ))}
        </ul>
        <input onKeyUp={this.onInput.bind(this)} placeholder="请输入事项" />
      </div>
    );
  }
}

ReactDOM.render(<Todo />, document.getElementById("app"));
