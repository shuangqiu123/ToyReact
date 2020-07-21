class ElementWrapper {
    constructor(type){
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name,value);
    }
    appendChild(vchild) {
        vchild.mountTo(this.root);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}
class TextWrapper{
    constructor(type){
        this.root = document.createTextNode(type);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

export class Component {
    constructor(){
        this.children = [];
    }
    mountTo(parent){
        let vdom = this.render();
        vdom.mountTo(parent);
    }
    setAttribute(name, value){
        this[name] = value;
    }
    appendChild(vchild) {
        this.children.push(vchild);
    }
}
export let ToyReact = {
    createElement(type, attributes, ...children){
        let element;
        if (typeof type === "string"){
            element = new ElementWrapper(type);
        }
        else{
            element = new type;
        }
        //let element = document.createElement(type);

        for (let name in attributes){
            // element[name] = attributes[name] wrong
            element.setAttribute(name,attributes[name]);
        }
        let insertChildren = (children)=>{
            for (let child of children){
                if (typeof child === "string"){
                    child = new TextWrapper(child);
                }
                if(typeof child === "object" && child instanceof Array){
                    insertChildren(child);
                }
                else{
                    element.appendChild(child);
                }

            }
        }

        return element;
    },
    render(vdom, element){
        vdom.mountTo(element);
    }
}
