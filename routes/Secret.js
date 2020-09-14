const secrets = {
    uri: "mongodb+srv://appuser:appuser@flustercluck.jcmwu.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"
};

const getSecret = key => secrets[key];

module.exports = getSecret;