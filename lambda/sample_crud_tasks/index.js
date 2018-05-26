const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    const operation = event.method;
    let params;
    switch (operation) {
        case 'GET':
            params = {
                TableName: "SAMPLE_TASKS",
            };
            dynamo.scan(params, callback);
            break;
        case 'PUT':
            params = {
                TableName: "SAMPLE_TASKS",
                Item: {
                    "ID": event.body.Item.id,
                    "taskname": event.body.Item.taskname
                }
            };
            dynamo.put(params, callback);
            break;
        case 'DELETE':
            console.log('event:',event);
            console.log('context:', context);
            params = {
                TableName: 'SAMPLE_TASKS',
                Key: {
                    "ID": event.ID
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