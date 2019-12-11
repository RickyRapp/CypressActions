
class ExportService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    export(url, contentType) {
        return this.apiClient.request({
            url: url,
            responseType: 'blob',
            headers: { Accept: contentType },
            method: 'GET',
        });
    }
}

export default ExportService;
