const SecretService = require('../services/secret.service')

exports.getSecret = async (req, res) => {
    const secret = req.headers["secret"];
    if (!secret || secret !== "key123") {
        return res.status(403).json({ message: "permition denied" });
    }
    const resp = await SecretService.getSecret()
    res.send(resp);
}