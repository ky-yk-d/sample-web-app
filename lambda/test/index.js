const https = require('https');

console.log('start');

const options = {
    hostname: 'l3uk6hufcf.execute-api.ap-northeast-1.amazonaws.com',
    path: '/prod/sample-tasks',
    PORT: 443,
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
    method: 'PUT'
};

exports.handler = async (event, context, callback) => {
    return new Promise((resolve, reject)=>{
        let res = https.request(options, (res)=>{
            console.log('statusCode:', res.statusCode);
        }).on('response',function(response){
            console.log('---response---');
            response.setEncoding('utf8');
            let body = '';
            console.log(body);
            response.on('data', (chunk)=>{
                body = body + chunk;
                console.log('chunk:',chunk);  // chunkが空のオブジェクト
                console.log('body:',body);
            });
            response.on('end', ()=>{
                callback(body);
                resolve('success & resolved');
            })
        }).on('error', function(e){
            console.log('error:', e.stack);
            reject('error & rejected');
        });
        let body = {
            Item: {
                id: 4,
                taskname: 'testTask',
                detail: new Date().toLocaleTimeString()
            }
        };
        res.write(JSON.stringify(body));
        res.end();
        });
};

async function implicitPromise(event, context, callback){
    let res = https.request(options, (res)=>{
        console.log('statusCode:', res.statusCode);
    }).on('response',function(response){
        console.log('---response---');
        console.log(response);
        callback('success!');
        return 'success & resolved';
    }).on('error', function(e){
        console.log('error:', e.stack);
        throw new Error('error & rejected');
    });
    let body = {
        Item: {
            id: 4,
            taskname: 'testTask',
            detail: new Date().toLocaleTimeString()
        }
    };
    res.write(JSON.stringify(body));
    res.end();
};

let that = this;

async function asyncFunc(){
    let promise = await that.handler(null,null,(res)=>{console.log('callback', res)});
    console.log(promise); // awaitをつけておくと'end of async handler'。つけないとPromiseオブジェクト。
    console.log('↑promise');
    return 'end';
}

console.log('before asyncFunc');
console.log(asyncFunc());  // Promise { pending }
console.log('after asyncFunc');

// console.log('before implicitPromise');
// console.log(implicitPromise(null,null,(res)=>{console.log('callback', res)}));  // Promise { resolved }
// console.log('after implicitPromise');