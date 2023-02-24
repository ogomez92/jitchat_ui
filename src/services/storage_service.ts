import StorageKey from '@src/enums/storage_key';

export default class StorageService {
public static setKey = (key: StorageKey, value: string) => localStorage.setItem(key, value);

public static getKey = (key: StorageKey): string | null => localStorage.getItem(key);
}
