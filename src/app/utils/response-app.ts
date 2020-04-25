export class ResponseApp<T> {
  constructor(
    public status: boolean,
    public data: T,
    public message?: string,
  ) { }
}
