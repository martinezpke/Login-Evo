const bcrypt = require('bcrypt');

async function hash(password){
    return await bcrypt.hash(password, 10);
}

async function compare(password, hash){
    try{
        const result = bcrypt.compare(password, hash);
        return result;
    }
    catch(error){
        throw error;
    }
}

module.exports = {hash, compare};