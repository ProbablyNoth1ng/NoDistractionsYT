export interface MessageType {
    action: 'toggleOnShorts' | 'toggleOffShorts'; 
    value: boolean;         
}

export interface StorageData {
    disableShorts:boolean
}

