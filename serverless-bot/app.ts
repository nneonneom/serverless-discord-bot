import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CommandProcessor } from './src/commands'
import { RequestValidator } from './src/request-validator'
import { createResponse } from './src/utils'


export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: any
    try {
        console.log("Incoming Request...", JSON.stringify(event))
        response = new RequestValidator(event).validate() ?? new CommandProcessor(event).process()
    } catch (err: any) {
        const message = err.body ?? 'some shit happened...idk..',
            statusCode = err.statusCode ?? 500
        console.log("grab the Aerosol bitch nigga...", err)
        response = createResponse({ message }, statusCode)
    } finally {
        console.log("Outgoing Response...", JSON.stringify(response))
        return response
    }
}

