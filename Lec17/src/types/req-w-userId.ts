import { Request } from "express";

export type RequestWUserId = Request & {
    userid?: string
}