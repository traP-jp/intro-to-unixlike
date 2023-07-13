const express = require('express');
const ogs = require('open-graph-scraper');
const app = express();


app.get('/api/ogp', async (req, res) => {
    const url = req.query.url; // パラメータとしてOGPを取得するURLを受け取る
    const options = { url: url };
    ogs(options)
        .then((data) => {
            const { error, result } = data;
            if (error) {
                console.error('Error fetching OGP:', error);
                res.status(500).json({ error: 'Failed to fetch OGP' });
            } else {
                console.log('result:', result); // This contains all of the Open Graph results
                const ogImage = result.ogImage;
                const twitterImage = result.twitterImage;

                let imageUrl = null;
                if (ogImage && ogImage.length > 0) {
                    imageUrl = ogImage[0].url;
                } else if (twitterImage && twitterImage.length > 0) {
                    imageUrl = twitterImage[0].url;
                }

                const ogpData = {
                    title: result.ogTitle,
                    description: result.ogDescription,
                    image: imageUrl,
                };
                console.log('ogpData:', ogpData);
                res.json(ogpData);
            }
        })
        .catch((error) => {
            console.error('Error fetching OGP:', error);
            res.status(500).json({ error: 'Failed to fetch OGP' });
        });
});

app.listen(3000, () => {
    console.log('Backend server is running on port 3000');
});
