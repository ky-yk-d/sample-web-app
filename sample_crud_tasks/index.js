const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentCrient();

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
                    "id": event.body.Item.id,
                    "task_name": event.body.Item.task_name
                }
            };
            dynamo.put(params, callback);
            break;
        default:
            callback('Unknown operation: ${operation}');
    }
};