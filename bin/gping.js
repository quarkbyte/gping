#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const DraftLog = require('draftlog').into(console)
var program = require('commander');
var request = require('request');
const cheerio = require('cheerio')

function getPingers(ip_url,callback){
  var pingers=[];
  request(
    {
        method: "POST",
        uri: 'http://ping.pe/ping.php?q='+ip_url,
        //proxy: "http://127.0.0.1:8888" // Note the fully-qualified path to Fiddler proxy. No "https" is required, even for https connections to outside.
    }
    , function (error, response, body) {
    if (!error && response.statusCode === 200) {
      //var $ = cheerio.load(body)
      var p;
      var pattern=/doSuperCrazyShit \( '(.+)', '(.+)', '(.+)', '(.+)', '(.+)' \)/g
      while(true){
        p=pattern.exec(body)
        if(p && p.length===6){
          pingers.push({
            pinger_id:p[1], 
            pinger_location:p[2], 
            pinger_provider:p[3], 
            request_id:p[4], 
            ip:p[5]  
          });
        }else{
          callback(null,pingers);
          break;
        }
      }
    }
  });
}
getPingers("baidu.com",(err,pingers)=>{
  console.log(pingers)
  ping(pingers[0],(err,sec)=>{
    console.log(sec)
  })
});
function ping(pinger,callback){
  request({
    method:"GET",
    url:`http://ping.pe/pinger.php?action=ping&pinger=${pinger.pinger_id}&request_id=${pinger.request_id}&ip=${pinger.ip}`
    ,proxy: "http://127.0.0.1:8888"
  },(error,response,body)=>{
    if(!error && response.statusCode===200){
      callback(null,body)
    }else{
      callback(true)
    }
  })
}


function list(val) {
  return val.split(',');
}
program.on('--help', function(){
  console.log(`  
  Examples:

    $ gping google.com --from usa --repeat 20
    $ gping 8.8.8.8 -f jp -r 1
  `);

});
program
  .version('1.0.0')
  .description('3223')
  .usage('<ip|url> [options]')
  .option('-f, --from <from>', 'specify which locations or ISP the pingers come from', list)
  .option('-r, --repeat <repeat>', 'specify how many times the pinger repeats,defual 10')
  .parse(process.argv);

  // output help and exit if no args found
// if (program.args.length === 0) {
//   program.help();
// }



function display(){

}

// var draft0 = console.draft()
// var draft = console.draft()
// var draft2 = console.draft()
// var elapsed = 1

// const frames = ['23.34', '11.6', '4.33', '5.88'];
// let i = 0;
// draft0("`Location				ISP	        Loss	Sent	Last	Avg	    Best	Worst	StDev	MTR	")
// setInterval( () => {

// 	const frame = frames[i = ++i % frames.length];
//   draft(
// `Canada, BC, Vancouver	Telus		0%		100		${frame}	5.22	4.76	5.67	0.27`
      
//   )
// }, 1000)
// setInterval( () => {

// 	const frame = frames[i = ++i % frames.length];
//   draft2(
// `Canada, BC, Vancouver	Telus		0%		100		${frame}	5.22	4.76	5.67	0.27`
      
//   )
// }, 1000)

//
// console.log(chalk.blue('Hello world!'));
// const logUpdate = require('log-update');
// const frames = ['23.34', '11.6', '4.33', '5.88'];
// let i = 0;

// setInterval(() => {
// 	const frame = frames[i = ++i % frames.length];

// 	logUpdate(
        
// `Location				ISP	        Loss	Sent	Last	Avg	    Best	Worst	StDev	MTR	
// Canada, BC, Vancouver	Telus		0%		100		${frame}	5.22	4.76	5.67	0.27	show	
// Canada, BC, Vancouver	Shaw		0%		100		16.73	19.21	15.94	75.3	6.56	show
// Canada, BC, Vancouver	Telus		0%		100		${frame}	5.22	4.76	5.67	0.27	show	
// Canada, BC, Vancouver	Shaw		0%		100		16.73	19.21	15.94	75.3	6.56	show
// Canada, BC, Vancouver	Telus		0%		100		${frame}	5.22	4.76	5.67	0.27	show	
// Canada, BC, Vancouver	Shaw		0%		100		16.73	19.21	15.94	75.3	6.56	show
// Canada, BC, Vancouver	Telus		0%		100		${frame}	5.22	4.76	5.67	0.27	show	
// Canada, BC, Vancouver	Shaw		0%		100		16.73	19.21	15.94	75.3	6.56	show
// Canada, BC, Vancouver	Telus		0%		100		${frame}	5.22	4.76	5.67	0.27	show	
// Canada, BC, Vancouver	Shaw		0%		100		16.73	19.21	15.94	75.3	6.56	show
// Canada, BC, Vancouver	Telus		0%		100		${frame}	5.22	4.76	5.67	0.27	show	
// Canada, BC, Vancouver	Shaw		0%		100		16.73	19.21	15.94	75.3	6.56	show
// Canada, BC, Vancouver	Telus		0%		100		${frame}	5.22	4.76	5.67	0.27	show	
// Canada, BC, Vancouver	Shaw		0%		100		16.73	19.21	15.94	75.3	6.56	show
// Canada, BC, Vancouver	Telus		0%		100		${frame}	5.22	4.76	5.67	0.27	show	
// Canada, BC, Vancouver	Shaw		0%		100		16.73	19.21	15.94	75.3	6.56	show`
// 	);
// }, 80);

