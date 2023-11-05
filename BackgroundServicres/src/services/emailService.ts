import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import { dbConfig } from '../config/dbConfig'
import { sendMail } from '../helpers/emailHelpers'
dotenv.config()

export const welcomeUser = async() =>{
    const pool = await mssql.connect(dbConfig)

    const employees = await (await pool.request().query('SELECT * FROM users WHERE isAssigned = 1 ')).recordset

    console.log(employees);
    

    for (let employee of employees){
        ejs.renderFile('templates/welcomeUser.ejs', {Name: employee.name}, async(error, data)=>{
            let mailOptions = {
                from: process.env.EMAIL as string,
                to: employee.email,
                subject: "Welcome Onboard",
                html: data
            }

            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE users SET isAssigned = 0 WHERE isAssigned = 1')

                await pool.request().execute('updateProjectStatusToComplete')

                console.log('Emails send to admin ...acompleted');
                
            } catch (error) {
                console.log(error);
                
            }
        })
    }
}