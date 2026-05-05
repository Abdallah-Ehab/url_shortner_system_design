export default class UrlController {
    constructor(idProvider, cacheClient, urlRepository, encoderService) {
        this.idProvider = idProvider;
        this.cacheClient = cacheClient;
        this.urlRepository = urlRepository;
        this.encoderService = encoderService;
    }
    createShortUrl = async (req, res) => {
        try {
            const { originalUrl } = req.body;

            const id = await this.idProvider.getNextID();
            const hash = this.encoderService.encodeBase62(id);

            await this.urlRepository.createUrl(id, hash, originalUrl);

            await this.cacheClient.set(hash, originalUrl);

            res.status(201).json({ status: 'success', shortUrl: hash });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
    redirectToOriginalUrl = async (req, res) => {
        try {
            const { shortUrl } = req.params;
            const originalUrl = await this.cacheClient.get(shortUrl);

            if (!originalUrl) {
                const urlRecord = await this.urlRepository.findOriginalUrlByHash(shortUrl);
                if (!urlRecord) {
                    return res.status(404).json({ status: 'error', message: 'URL not found' });
                }
                await this.cacheClient.set(shortUrl, urlRecord);
                return res.status(302).redirect(urlRecord);
            }

            res.status(302).redirect(originalUrl);
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }
}