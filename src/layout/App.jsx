import { useSelector, useDispatch } from 'react-redux';
import { selectTest } from '../store/reducers/user';
import React, { useEffect } from 'react';
import { oauthUser } from '../actions/user'
import * as d3 from "https://cdn.skypack.dev/d3@7";
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles'
import Button from '@mui/material/Button';
cytoscape.use(edgehandles);

function App() {
    const res = useSelector(selectTest);
    const dispatch = useDispatch();
    var cy, eh;

    useEffect(()=>{
        // let i = 0;
        // setInterval(() => {
        //     dispatch(oauthUser(`發布指令:${i}`));    
        //     i++
        // }, 3000);        
        // console.log("see:", oauthUser("發布指令"));
        cy = cytoscape({
          container: document.getElementById('cy'),
          elements:[{"group":"nodes","data":{"name":"Test","weight":75,"type":"square","width":10,"height":10}},{"group":"nodes","data":{"name":"Test","weight":75,"type":"square","width":10,"height":10}},{"group":"nodes","data":{"name":"Test","weight":75,"type":"square","width":10,"height":10}},{"group":"nodes","data":{"name":"Test","weight":75,"type":"square","width":10,"height":10}},{"group":"nodes","data":{"name":"Test","weight":75,"type":"square","width":10,"height":10}}],
          layout: {
            name: 'grid',
          
            fit: true, // whether to fit the viewport to the graph
            padding: 30, // padding used on fit
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
            nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
            spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
            condense: false, // uses all available space on false, uses minimal space on true
            rows: undefined, // force num of rows in the grid
            cols: undefined, // force num of columns in the grid
            position: function( node ){}, // returns { row, col } for element
            sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
            animate: false, // whether to transition the node positions
            animationDuration: 500, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled
            animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
            ready: undefined, // callback on layoutready
            stop: undefined, // callback on layoutstop
            transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
          },
          style: [
            {
              selector: 'node',
              style: {
                'background-image': [
                  'https://cdn.icon-icons.com/icons2/1852/PNG/512/iconfinder-server2-4417099_116631.png?format=webp'
                ],
                'background-color': '#ffffff',
                'background-fit': 'cover',
                'background-image-opacity': 0.5,
                'label': 'data(name)',
                "shape": "data(type)",
                'width': "data(width)",
                'height': "data(height)",
                'font-size': 3
              }
            },
            {
              selector: 'edge',
              style: {
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'width': 0.5,
                'height': 0.5,
                'arrow-scale': 0.5,
              }
            },
            {
              selector: '.eh-handle',
              style: {
                'background-color': 'red',
                'width': 12,
                'height': 12,
                'shape': 'ellipse',
                'overlay-opacity': 0,
                'border-width': 12, // makes the handle easier to hit
                'border-opacity': 0
              }
            },

            {
              selector: '.eh-hover',
              style: {
                'background-color': 'red'
              }
            },

            {
              selector: '.eh-source',
              style: {
                'border-width': 0.5,
                'border-color': 'red'
              }
            },

            {
              selector: '.eh-target',
              style: {
                'border-width': 0.5,
                'border-color': 'red'
              }
            },

            {
              selector: '.eh-preview, .eh-ghost-edge',
              style: {
                'background-color': 'red',
                'line-color': 'red',
                'target-arrow-color': 'red',
                'source-arrow-color': 'red',
                'width': 0.5,
                'height': 0.5,
                'arrow-scale': 0.5,
                
              }
            },

            {
              selector: '.eh-ghost-edge.eh-preview-active',
              style: {
                'opacity': 0
              }
            }
          ]
        })
        let defaults = {
          canConnect: function( sourceNode, targetNode ){
            // whether an edge can be created between source and target
            return !sourceNode.same(targetNode); // e.g. disallow loops
          },
          edgeParams: function( sourceNode, targetNode ){
            // for edges between the specified source and target
            // return element object to be passed to cy.add() for edge
            return {};
          },
          hoverDelay: 150, // time spent hovering over a target node before it is considered selected
          snap: true, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
          snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
          snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
          noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
          disableBrowserGestures: true // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
        };
        eh = cy.edgehandles();
    }, [dispatch])

    function addMachineA(){
      cy.add({
        group: 'nodes',
        data: { name: 'M', weight: 75, type: 'rectangle', width: 10, height: 10 },
        position: { x: 80, y: 100 }
      })
    }

    function addMachineB(){
      cy.add({
        group: 'nodes',
        data: { name: 'P', weight: 75, type: 'rectangle', width: 15, height: 15 },
        position: { x: 100, y: 100 }
      })
    }

    function removeMachine(){
      const eles = cy.$(':selected');
      eles.remove();
    }

    function removeAllMachines(){
      cy.elements().remove();
    }
    
    function save(){
      // 儲存目前的畫面資料
      const cyjsonStr = JSON.stringify(cy.json());
      window.localStorage.setItem("elements", cyjsonStr);
      console.log("cyjsonStr:", cyjsonStr);
    }

    function load(){
      // 移除畫面上所有物件
      removeAllMachines();
      // 取出畫面資料顯示在畫板上
      const cyjson = JSON.parse(window.localStorage.getItem("elements"))
      cy.json({ ...cyjson })
    }

    function startLink(){
      eh.enableDrawMode();
    }

    function stopLink(){
      eh.disableDrawMode();
    }
    
    return (
      <>
      <Button onClick={addMachineA}>Add Machine A</Button>
      <Button onClick={addMachineB}>Add Machine B</Button>
      <Button onClick={removeMachine}>Remove</Button>
      <Button onClick={removeAllMachines}>Clear</Button>
      <Button onClick={save}>Save</Button>
      <Button onClick={load}>Load</Button>
      <Button onClick={startLink}>Link On</Button>
      <Button onClick={stopLink}>Link Off</Button>
        <div id="cy" style={{
          width: "80%",
          height: "80%",
          position: "absolute",
          top: "50px",
          left: "0px",
          border: "1px solid #cccccc"
        }}></div>
      </>

    );
}
  
  export default App;