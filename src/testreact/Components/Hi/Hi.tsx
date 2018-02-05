import * as React from "react";

interface HiProps { compiler?: string; framework?: string; }
interface HiState { date?: Date }

import "./Hi.less";

export class Hi extends React.Component<HiProps,HiState> {
	constructor(props:HiProps) {
		super(props);
		this.state = {date: new Date()};
	  }
	  componentDidMount() {
		this.timerID = setInterval(
		  () => this.tick(),
		  1000
		);
	  }
	
	  componentWillUnmount() {
		clearInterval(this.timerID);
	  }
	  timerID:any;
	  tick() {
		this.setState({
		  date: new Date()
		});
	}
    render(){
        return (
				<span className="hi">
					hello {this.state.date.toLocaleTimeString()}
				</span>
		);
    } 
}