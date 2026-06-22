

exports.redirectChess = (req, res) => {
    console.log(req.headers["user-agent"]);
  res.redirect("https://chess.com");
}