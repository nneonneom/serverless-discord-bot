import { APIGatewayProxyResult } from "aws-lambda"

export const createResponse = (body: any, statusCode: number = 200): APIGatewayProxyResult => {
    return {
        statusCode,
        body: JSON.stringify(body)
    }
}