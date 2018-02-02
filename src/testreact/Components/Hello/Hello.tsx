import * as React from "react";
import {Hi} from "../Hi/Hi";

import "./Hello.less";

export interface HelloProps { compiler: string; framework: string; }


interface HiProps { compiler?: string; framework?: string; }

export class Hello extends React.Component<HelloProps,any> {
    render(){
        return (
			<h1 className="hello"><Hi /> Hello from {this.props.compiler} and {this.props.framework}!</h1>
		);
    } 
}