export class FetchError extends Error {
  code:number;
  response:Response;

  constructor(res:Response) {
    super(res.statusText);
    this.name = "FetchError";
    this.code=res.status;
    this.response=res;
  }
}
