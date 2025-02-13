export interface MessageType {
    action: 'toggleOnShorts' | 'toggleOffShorts' | 'toggleOnGrayscale' | 'toggleOffGrayscale'; 
    value: boolean;         
}

export interface StorageShorts {
    disableShorts:boolean
}

export interface StorageGrayscale{
    grayscale:boolean
}