import Url from '../models/url.model.js';
import db from '../db_connection.js';

export const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  // I need to generate a unique hash for the original url
  // and then save the original url and the hash in the database
  // and then return the short url to the user
  res.send('Short URL created successfully');
}


export const redirectToOriginalUrl = async (req, res) => {
    const { shortUrl } = req.params;
}