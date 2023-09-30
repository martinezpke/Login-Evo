const bcrypt = require('bcrypt');
const pool = require('../db/connection');
const jwt = require('jsonwebtoken');
require("dotenv").config()
const { hash, compare } = require('../helpers/verify');
const generateToken = require('../helpers/generator_token');
const SECRET_KEY = process.env.KEY_TOKEN;

exports.login = async (req, res) => {
    const { username, password } = req.body;
    pool.query('SELECT * FROM users WHERE (name = $1 or email = $2 or user= $3) ', [username, username, username], async (error, result) => {
        if (error) {
            return console.error('Error executing query', error);
        }

        if (result.rows.length > 0) {
            try {
                const isPasswordValid = await compare(password, result.rows[0].password);
                if (isPasswordValid === true) {
                    await generateToken(res, result.rows[0].id,result.rows[0].name);
                }
                else {
                    res.status(401).json({ error: 'Contraseña incorrecta' });
                }
            }
            catch (error) {
                console.error("Error al comparar", error);
            }
        }
        else {
            res.status(401).send('Nombre de usuario o contraseña incorrectos');
        }

    });
}