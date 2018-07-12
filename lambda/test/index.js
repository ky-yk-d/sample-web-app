const https = require('https');

console.log('start');

exports.handler = async (event, context, callback) => {
    const options = {
        hostname: 'l3uk6hufcf.execute-api.ap-northeast-1.amazonaws.com',
        path: '/prod/sample-tasks',
        PORT: 443,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        method: 'PUT'
    };
    let res = https.request(options, function(res){
        console.log('statusCode:', res.statusCode);
    }).on('response',function(response){
        console.log('---response---');
        console.log(response);
        // callback(null, 'success!');
        return 'success!';
    }).on('error', function(e){
        console.log('error:', e.stack);
        throw new Error('error thrown!');
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
    return 'end of async handler';
};

// let promise = this.handler(null,null,(res)=>{console.log('callback', res)});
// console.log(typeof(promise));
// console.log(promise);
// console.log('↑promise');

let that = this;

async function asyncFunc(){
    let promise = await that.handler(null,null,(res)=>{console.log('callback', res)});
    console.log(promise); // awaitをつけておくと'end of async handler'。つけないとPromiseオブジェクト。
    console.log('↑promise');
    return 'end';
}

console.log('before');
asyncFunc();  
console.log('after');