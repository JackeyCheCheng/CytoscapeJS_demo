// let arr = [];
// let arr2 = [];
// let nodeCount = 1000;
// for (let i = 0; i < nodeCount; i++) {
//     arr.push({"knmp_on": false, "snmp_on": true, "ip": "192.168.2.55", "vlan": 1, "flag": 0, "netmask": "255.255.255.0", "device_name": `device_${i}`, "mac": "00-11-22-33-44-55", "ip_on": false, "id": `s${i}`, "gateway": "0.0.0.0"})    
//     // arr2.push({"source": `s${i}`, "target_port_disp": "port_3", "source_port_disp": "port_4", "target": `s${i+1>=nodeCount?0:i+1}`})
// }
// let topo = {
//     "topo": {
//         "nodes": arr,

//         "links": arr2
//     }
// }
//  var json = JSON.stringify(topo);
//  var fs = require('fs');
//  fs.writeFile('myjsonfile.json', json, 'utf8', t=>t);
//  fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
//     if (err){
//         console.log(err);
//     } else {
//     json = JSON.stringify(topo); //convert it back to json
//     fs.writeFile('myjsonfile.json', json, 'utf8', t=>t  ); // write it back 
// }});

const counts = 5;
const allArray = [];
for (let index = 0; index < counts; index++) {
    allArray.push({
        group: 'nodes',
        data: { name: 'Test', weight: 75, type: 'square', width: 10, height: 10 }
    })
}
console.log("allArray:", allArray.length);
var json = JSON.stringify(allArray);
var fs = require('fs');
fs.writeFile('myjsonfile.json', json, 'utf8', t=>t);
fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
   if (err){
       console.log(err);
   } else {
   json = JSON.stringify(allArray); //convert it back to json
   fs.writeFile('myjsonfile.json', json, 'utf8', t=>t  ); // write it back 
}});