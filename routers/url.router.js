export default function createUrlRouter(controller) {
    const router = router();

    const urlController = controller;

    router.post('/shorten', urlController.createShortUrl);
    router.get('/:shortUrl', urlController.redirectToOriginalUrl);

    return router;
}