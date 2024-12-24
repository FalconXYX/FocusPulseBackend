// Helper types.

// Inspired by https://github.com/middyjs/middy/issues/316#issuecomment-571237927.
export interface APIGatewayProxyEventMiddyNormalised<T = string> extends Omit<AWSLambda.APIGatewayProxyEvent, 'body'> {
  queryStringParameters: NonNullable<AWSLambda.APIGatewayProxyEvent['queryStringParameters']>;
  multiValueQueryStringParameters: NonNullable<AWSLambda.APIGatewayProxyEvent['multiValueQueryStringParameters']>;
  pathParameters: NonNullable<AWSLambda.APIGatewayProxyEvent['pathParameters']>;
  body: T;
}
