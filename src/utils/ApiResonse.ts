export class ApiResponse {
    public statusCode : number;
    public data : any;
    public message : string;
    constructor(statudCode : number, data :any, message : string) {
        this.statusCode = statudCode;
        this.data = data;
        this.message = message;
    }
}