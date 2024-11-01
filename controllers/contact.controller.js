const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const contactController = {
    contact: (req, res) => {
        res.render('contact/contact.ejs', {title: 'Contacto'});
    },
    sendMail: async (req, res) =>  {
        try {
            const { name, email, message } = req.body;
        const messageHtml = `<h3>Mensaje de ${name}</h3>
        <p>${message}</p>
        <p>Responder a: ${email}</p>`;
            const transporter = nodemailer.createTransport({
                host: process.env.HOST,
                port: process.env.HOST_PORT,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            const mailOptions = {
                from: process.env.FROM,
                to: process.env.TO,
                subject: process.env.SUBJECT,
                html: messageHtml,
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.send(error.message);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.redirect("/");
                }
            })
        } catch (error) {
            console.log("ERROR: ", error.message);
        }
    },
    sendRecoveryMail: async (email, subject, messageHtml) => {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.HOST,
                port: process.env.HOST_PORT,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            const mailOptions = {
                from: process.env.FROM,
                to: email,
                subject: subject,
                html: messageHtml,
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })
        } catch (error) {
            console.log("ERROR: ", error.message);
        }
    }
}

module.exports = contactController;