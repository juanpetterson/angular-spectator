export class Storage {
  public constructor(private readonly name: string) {}

  public set(key: string, data: any) {
    const newKey = this.name.concat('_').concat(key);
    localStorage.setItem(newKey, JSON.stringify(data));
  }

  public get(key: string) {
    const newKey = this.name.concat('_').concat(key);
    return JSON.parse(localStorage.getItem(newKey));
  }

  public remove(key: string) {
    const newKey = this.name.concat('_').concat(key);
    return localStorage.removeItem(newKey);
  }
}
