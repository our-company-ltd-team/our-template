import * as React from "react";
import { Hi } from "../Hi/Hi";
import "./Hello.less";


const isBrowser = typeof window !== 'undefined';
const Hammer: HammerStatic = isBrowser ? require('hammerjs') : undefined;



export interface HelloProps { compiler: string; framework: string; }


interface HiProps { compiler?: string; framework?: string; }

export class Hello extends React.Component<HelloProps, any> {
    hammer: HammerManager;
    h1: HTMLHeadingElement;
    next() {
        console.log('swipe next')
    }
    prev() {
        console.log('swipe prev')
    }
    componentDidMount() {
        if (Hammer) {
            this.hammer = new Hammer(this.h1);
            this.hammer.on('swipeleft', this.next);    // remove ()
            this.hammer.on('swiperight', this.prev);   // remove ()
        }
    }
    render() {
        return (
            <h1 ref={
                (el) => this.h1 = el
            } className="hello"><Hi /> why not ? {this.props.compiler} and {this.props.framework}!</h1>
        );
    }
}