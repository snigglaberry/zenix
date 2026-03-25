export default async function handler(req, res) {
    const { path } = req.query;

    const url = `https://i.ibb.co/${path}`;
    const response = await fetch(url);

    if (!response.ok) return res.status(404).end();

    res.setHeader("Content-Type", response.headers.get("content-type"));
    response.body.pipe(res);
}
