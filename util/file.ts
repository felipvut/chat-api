export class FileUtilService {
    popularSignatures = {
        JVBERi0: "application/pdf",
        R0lGODdh: "image/gif",
        R0lGODlh: "image/gif",
        iVBORw0KGgo: "image/png",
        "/9j/": "image/jpg"
    };

    detectMimeType(base64: string) {
        const partsBase64 = base64?.split(':');
        if(partsBase64?.length >= 2) {
            const mimeType = partsBase64[1]?.split(';');
            if(mimeType?.length > 0) {
                return mimeType[0]
            }
        }
        return '';
    }
}