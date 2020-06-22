export class JSONHelper {
  sort(json: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    if (typeof json === 'object' && json !== null) {
      Object
        .keys(json)
        .sort()
        .forEach((key: string) => {
          result[key] = json[key];
          if (typeof result[key] === 'object' && result[key] !== null) {
            result[key] = this.sort(result[key]);
          }
        });
    }
    return result;
  }

  unflatten(jsonTable: Record<string, any>) {
    if (jsonTable) {
      const result: Record<string, any> = {};
      Object
        .keys(jsonTable)
        .forEach((key: string) => {
          const namespaces: string[] = key.split('.');
          const lastIndex: number = namespaces.length - 1;
          let current: Record<string, any> = result;
          namespaces.forEach((namespace: string, index: number) => {
            if (!current.hasOwnProperty(namespace)) {
              current[namespace] = (index === lastIndex) ? jsonTable[key] : {};
            }
            if (typeof current[namespace] === 'object') {
              current = current[namespace];
            }
          });
        });
      return this.sort(result);
    }
    return jsonTable;
  }

  flatten(json: { [key: string]: any }, parentKey: string = '') {
    if (typeof json === 'object' && json !== null) {
      let result: Record<string, any> = {};
      Object
        .keys(json)
        .forEach((key: string) => {
          const combinedKey: string = parentKey ? `${parentKey}.${key}` : key;
          if (typeof json[key] !== 'object' || json[key] === null) {
            result[combinedKey] = json[key];
          } else {
            result = {
              ...result,
              ...this.flatten(json[key],
                combinedKey,
              ),
            };
          }
        });
      return this.sort(result);
    }
    return json;
  }
}

export const jsonHelper: JSONHelper = new JSONHelper();
