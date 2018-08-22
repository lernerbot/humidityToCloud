var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var ddb = new AWS.DynamoDB();

//let uuid_val = function b(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)};

const saveRecord = (data) => {
  let params = {
      TableName: 'UncorkedHumidity',
      Item: data
  };

  return new Promise((resolve, reject) => {
      ddb.putItem(params, function(err, data) {
        if (err) {
          console.log('ERROR!');
          console.log(err);
          reject(err);
        } else {
          // Basically return whatever object you want back
          let responseBody = {
            ID: params.Item.ID.S,
            sensorNumber: params.Item.sensorNumber.S,
            date: params.Item.date.S,
            temperature: params.Item.temperature.S,
            humidity: params.Item.humidity.S,
            created_at: params.Item.created_at.S
          }
          resolve({
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody),
            "isBase64Encoded": false
          });
        }
      });
  });
};

exports.handler = async function(event, context) {
  let params = JSON.parse(event.body);
  console.log("params: ");
  console.log(params);
  let data = {
    'ID'          : {S: new Date().toISOString()},
    'sensorNumber': {S: params.sensor.toString()},
    'date'        : {S: params.date.toString()},
    'temperature' : {S: params.temperature.toString()},
    'humidity'    : {S: params.humidity.toString()},
    'created_at'  : {S: new Date().toISOString()}
  }; 
  
  console.log('DATA:');
  console.log(data);

  let response = await saveRecord(data);
  
  console.log('Response:', response);
};
