abstract class HttpError extends Error{
    status!:number;
}

export class RequestError  extends HttpError{
  public status:any
  constructor(message:string){
      super(message)
      this.status = 200 //default is success
  }
   
}

/**
* CREATES AN ERROR OBJECT THAT HANDLES BOTH INTERNAL AND SERVER ERRORS
* ERROR OBJECTS INHERITS FROM BOTH JS NATIVE ERROR AND HAVE EXTRA
* FIELD STATUS TO KNOW IF IT'S A REQUEST ERROR
* 
* @param  {number} status The request status
* @param  {string} message The message to be returned
* @return {Object} error object
* 
*/
export function createError(status:number, message:string) {
   const error = new RequestError(message);
   error.status = status;
   return error;
}