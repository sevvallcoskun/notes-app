class HttpError extends Error{
    constructor(message?:string){
        super(message);
        this.name=this.constructor.name;
    }
}

/**
 * 401 error
 */
export class UnAuthorizedError extends HttpError{}
/**
 * 409
 */
export class ConflictError extends HttpError{}