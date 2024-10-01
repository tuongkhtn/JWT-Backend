

const initWebRoutes = (app) => {
    app.get("/", (req, res) => {
        return res.send("Hell World")
    })
}

export default initWebRoutes;