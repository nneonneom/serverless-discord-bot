import { APIGatewayProxyEvent } from 'aws-lambda'
import { createResponse } from '../../utils'
import CommandMap from '../command-map'
import { Command } from '../models'

export class CommandProcessor {
    private command: Command
    constructor({ body }: APIGatewayProxyEvent) {
        const parsedBody = JSON.parse(body!)
        this.command = CommandMap[parsedBody.data.name]
    }
    public process() {
        if (!this.command) throw new Error('Command not found!')
        
        const message = this.command.execute()
        return createResponse({
            "type": 4,
            "data": {
                "tts": false,
                "content": message,
                "embeds": [],
                "allowed_mentions": { "parse": [] }
            }
        })
    }
}