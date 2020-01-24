export class AssetLoader {
  static _promises = Array<Promise<HTMLImageElement>>();
  static _assets = new Map<string, HTMLImageElement>();

  static addImage(name: string, url: string) {
    const img = new Image();
    img.src = url;

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      img.addEventListener('load', () => {
        this._assets.set(name, img);
        resolve(img);
      });
    });
    this._promises.push(promise);
  }

  static async loadAll() {
    return Promise.all(this._promises);
    // return Promise.all(this._promises).then(() => this._assets);
  }

  static get(name: string) {
    const image = this._assets.get(name);
    if (!image) {
      return document.createElement('img');
    }
    return image;
  }
}
