export default async function handler(req, res) {
    try {
        const { path } = req.query;

        if (!path) {
            return res.status(400).send("missing path");
        }

        const url = `https://i.ibb.co/${path}`;
        const response = await fetch(url);

        if (!response.ok) {
            return res.status(404).end();
        }

        const contentType = response.headers.get("content-type") || "image/jpeg";

        // IMPORTANT: convert to buffer (no streaming)
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.setHeader("Content-Type", contentType);
        res.send(buffer);

    } catch (err) {
        console.error(err);
        res.status(500).send("server error");
    }
}
