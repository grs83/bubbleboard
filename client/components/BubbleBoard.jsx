import React, { Component } from "react";
import { ForceGraph2D } from "react-force-graph";

const BubbleBoard = props => {
  let bbStyle = {
    width: "1600px",
    height: "800px"
  };

  let theObject = props.object;



    if (!props.object){theObject = {
      'of': {heaven: 'tongues'},
      'are': 'fencing',
      'too': {'many': ['leaves', {'in the':'city'}]},
      'a': {
        week: {
          'of': {heaven: 'tongues'},
          'are': 'fencing',
          'too': {'many': ['leaves', {'in the':{
            'of': {heaven: 'tongues'},
            'are': 'fencing',
            'too': {'many': ['leaves', {'in the':'city'}]},
            'a': {
              week: 'is',
              such: {a: {long: {time: 'eras', rot:'like nature'}}}
            }
          }}]},
          'a': {
            week: 'is',
            such: {a: {long: {time: 'eras', rot:'like nature'}}}
          }
        },
        such: {a: {long: {time: 'eras', rot:'like nature'}}}
      }
    };
  }

    let nodes = []
    let links = [];

    //props.bubbles is an array of bubbleob objects, which you can use to generate bubbleob elements

  //   const bubbleify = (ob) => {
  //     let bubble = BubbleOb();
      
  //     let keys = Object.keys(ob);
  
  //     for (let key of keys){
  //       if (typeof ob[key] === 'object'){
  //         let newBubble = bubbleify(ob[key]);
  
  //         newBubble.parent = ob;
  //         newBubble.key = key;
  //         bubble.children.push(newBubble);
  //       }
  //       else {
  //         let newPrimBubble = BubbleOb();
  //         newPrimBubble.data = ob[key];
  //         newPrimBubble.parent = ob;
  //         newPrimBubble.key = key;
  //         bubble.children.push(newPrimBubble);
  //       }
  //     }
      
  //     return bubble;
  // }
  
  //   const nodeify = (bubble) => {
  //     let thisNode = {id: nodes.length, nodeLabel: bubble.key, color:'#333333'}
  //     if (bubble.data){thisNode.nodeLabel += ' : '+bubble.data}
  //     if (thisNode.nodeLabel === undefined){thisNode.nodeLabel = props.name};
  //     nodes.push(thisNode);
  //     for (let i = 0; i < bubble.children.length; i++){
  //       let childNode = nodeify(bubble.children[i])
  //       let link = {source: thisNode.id,
  //                   target: childNode.id};
  //       links.push(link);
        
  //     }
  //     return thisNode;
  //   }
  
  
    const BubbleOb = (parent, offsetX, offsetY, style, data, ID, children = [], key) => {
      let bubble = {};
      bubble.key = key;
      bubble.parent = parent;
      bubble.offsets = {x: offsetX, y: offsetY}
  
      if (bubble.parent) {
        bubble.pos = {x: bubble.parent.pos.x + bubble.offsets.x,
                    y: bubble.parent.pos.y + bubble.offsets.y};
      }
      
      bubble.style = style;
      bubble.data = data; //shouldnt be anything unless its a primitive value
      
      bubble.children = [];
  
      return bubble;
    }
  // let nodes = [];
  // let links = [];

  //props.bubbles is an array of bubbleob objects, which you can use to generate bubbleob elements

  const bubbleify = ob => {
    let bubble = BubbleOb();

    let keys = Object.keys(ob);

    for (let key of keys) {
      if (typeof ob[key] === "object") {
        let newBubble = bubbleify(ob[key]);

        newBubble.parent = ob;
        newBubble.key = key;
        bubble.children.push(newBubble);
      } else {
        let newPrimBubble = BubbleOb();
        newPrimBubble.data = ob[key];
        newPrimBubble.parent = ob;
        newPrimBubble.key = key;
        bubble.children.push(newPrimBubble);
      }
    }

    return bubble;
  };

  const nodeify = bubble => {
    let thisNode = {
      id: nodes.length,
      nodeLabel: bubble.key,
      color: "#dddddd"
    };
    if (bubble.data) {
      thisNode.nodeLabel += " : " + bubble.data;
    }
    if (thisNode.nodeLabel === undefined) {
      console.log("Look here greg for number of boards" + props.numberOfBoards)

      thisNode.nodeLabel = props.rootName || 'Root';
    }
    nodes.push(thisNode);
    for (let i = 0; i < bubble.children.length; i++) {
      let childNode = nodeify(bubble.children[i]);
      let link = {
        source: thisNode.id,
        target: childNode.id
      };
      links.push(link);
    }
    return thisNode;
  };

  // const BubbleOb = (
  //   parent,
  //   offsetX,
  //   offsetY,
  //   style,
  //   data,
  //   ID,
  //   children = [],
  //   key
  // ) => {
  //   let bubble = {};
  //   bubble.key = key;
  //   bubble.parent = parent;
  //   bubble.offsets = { x: offsetX, y: offsetY };

  //   if (bubble.parent) {
  //     bubble.pos = {
  //       x: bubble.parent.pos.x + bubble.offsets.x,
  //       y: bubble.parent.pos.y + bubble.offsets.y
  //     };
  //   }

  //   bubble.style = style;
  //   bubble.data = data; //shouldnt be anything unless its a primitive value

  //   bubble.children = [];

  //   return bubble;
  // };

  nodeify(bubbleify(theObject));

  let bubbleData = {
    nodes,
    links
  };
  function outer(){
  let forceGraph = <ForceGraph2D
    graphData={bubbleData}
    // backgroundColor="#003434"
    
    width={1000}
    height={600}
    nodeRelSize={10}
    linkWidth={8}
    linkColor="#F1CD7D"
    nodeColor={{color: "#C56698"}}
    //runs function for every node 
    nodeCanvasObject={(node, ctx, globalScale) => {
      const label = node.nodeLabel;
      console.log(props.numberOfBoards)
      const fontSize = 12 / Math.sqrt(globalScale);
      ctx.font = `${fontSize}px Sans-Serif`;
      const textWidth = ctx.measureText(label).width;
      const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 1); // some padding
      ctx.fillStyle = "rgba(30,144,255 ,1 )";
      ctx.fillRect(
        node.x - bckgDimensions[0] / 2,
        node.y - bckgDimensions[1] / 2,
        ...bckgDimensions
      );
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = node.color;
      ctx.fillText(label, node.x, node.y);
    }}
  />
  }

  let el = (
    outer()
  );

  return el;
};

export default BubbleBoard;
