import {ToyReact, Component} from "./ToyReact.js";

class MyComponent extends Component{
    mountTo(parent){
        let vdom = this.render();
        vdom.mountTo(parent);
    }
    setAttribute(name, value){
        this[name] = value;
    }
    render(){
        return <div>dada!</div>
    }
}
let a = <MyComponent id="a">
    <span>dada!</span>
    <div>
        {this.children}
    </div>
        </MyComponent> ;

ToyReact.render(
    a,
    document.body
)