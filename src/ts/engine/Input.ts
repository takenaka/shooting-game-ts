export class Input {
  constructor(private keyMap: Map<string, KeyType>, private prevKeyMap:  Map<string, KeyType>) {}

  _getKeyFromMap(KeyName: string, map:  Map<string, KeyType>) {
    if(map.has(KeyName)) {
      return map.get(KeyName);
    } else {
      return false;
    }
  }

  _getPrevKey(KeyName: string) {
    return this._getKeyFromMap(KeyName, this.prevKeyMap);
  }

  getKey(KeyName: string) {
    return this._getKeyFromMap(KeyName, this.keyMap);
  }

  getKeyDown(KeyName: string) {
    const prevDown = this._getPrevKey(KeyName);
    const currentDown = this.getKey(KeyName);
    return (!prevDown && currentDown);
  }

  getKeyUp(KeyName: string) {
    const prevDown = this._getPrevKey(KeyName);
    const currentDown = this.getKey(KeyName);
    return (prevDown && !currentDown);
  }
}
