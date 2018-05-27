const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    const operation = event.method;
    let params;
    switch (operation) {
        case 'GET':
            params = {
                TableName: "tasks",
            };
            dynamo.scan(params, callback);
            break;
        case 'PUT':
            params = {
                TableName: "tasks",
                Item: {
                    "id": event.body.Item.id,
                    "taskname": event.body.Item.taskname
                }
            };
            dynamo.put(params, callback);
            break;
        case 'DELETE':
            console.log('event:',event);
            console.log('context:', context);
            params = {
                TableName: 'tasks',
                Key: {
                    "id": event.id
                }
            };
            dynamo.delete(params, callback);
            break;
        default:
            console.log('event:',event);
            console.log('context:', context);
            callback('Unknown operation: ${operation}');
    }
};