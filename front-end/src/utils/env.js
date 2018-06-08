let basicUrl = ""
if (process.env.NODE_ENV == "development") {
    basicUrl = "http://localhost:9999"
} else {
    basicUrl = "http://193.112.202.42:9999"
}

export default  {basicUrl} 