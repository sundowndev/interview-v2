module.exports = function(app) {
app.get('/posts', (req, res) => {
    // You'll create your note here.
    res.send('Hello')
});
}
