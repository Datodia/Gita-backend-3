import { Strategy } from 'passport-google-oauth2';
declare const GoogleStrategy_base: new (...args: [] | [options: import("passport-google-oauth2").StrategyOptionsWithRequest] | [options: import("passport-google-oauth2").StrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor();
    validate(accessToken: any, refreshToken: any, profile: any, done: any): Promise<void>;
}
export {};
