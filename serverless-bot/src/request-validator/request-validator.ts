import { APIGatewayProxyEventHeaders, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { HttpError } from "http-json-errors"
import nacl from "tweetnacl"
import { createResponse } from "../utils"

export class RequestValidator {
    private body: string | null
    private headers: APIGatewayProxyEventHeaders
    private discordPingResponse: APIGatewayProxyResult | undefined

    constructor({body, headers}: APIGatewayProxyEvent) {
        this.body = body
        this.headers = headers
    }

    validate() {
        this.validatePayload()
        this.handleDiscordWebhookRequirements() //https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction
        return this.discordPingResponse
    }

    private validatePayload() {
        if (!this.body) throw new HttpError({
            type: 'HttpError',
            statusCode: 401,
            body: 'missing body'
        })
    }


    private handleDiscordWebhookRequirements() {
        this.checkSignature()
        this.handleDiscordPings()
    }


    private checkSignature() {
        const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY,
            signature = this.headers['x-signature-ed25519'],
            timestamp = this.headers['x-signature-timestamp']

        let isVerified = false
        console.log("this.headers", JSON.stringify(this.headers))
        console.log("FUCKING HELLLL",`${PUBLIC_KEY} | ${signature} | ${timestamp}`)
        if (timestamp && signature && PUBLIC_KEY) {
            isVerified = nacl.sign.detached.verify(
                Buffer.from(timestamp + this.body),
                Buffer.from(signature, 'hex'),
                Buffer.from(PUBLIC_KEY, 'hex')
            )
        }

        if (!isVerified) {
            throw new HttpError({
                type: 'HttpError',
                statusCode: 401,
                body: 'invalid request signature'
            })
        }
    }

    private handleDiscordPings() {
        const parsedBody = JSON.parse(this.body!)
        if (parsedBody.type == 1)
            this.discordPingResponse = createResponse({ type: 1 })
    }
}