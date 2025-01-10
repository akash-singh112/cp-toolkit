import express from 'express'
import cors from 'cors'
import fs from 'fs'
import {exec} from 'child_process'
import process from 'process'

const app = express();

//add middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/exec-time',async (req,res)=>{
    const {codeText,inputText} = req.body;

    fs.writeFileSync('code.cpp', codeText);
    fs.writeFileSync('input.txt', inputText);

    const start = process.hrtime();

    exec('g++ code.cpp -o code.exe && code.exe < input.txt', (error, stdout, stderr) => {
        const end = process.hrtime(start);
        const executionTime = end[0] * 1000 + end[1] / 1000000; // time-ms

        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: stderr });
        }

        res.status(200).json({
            message:'Success',
            executionTime: executionTime,
            output: stdout,
        });

        fs.unlinkSync('code.cpp');
        fs.unlinkSync('input.txt');
    });
    
});

app.listen(8800,()=>{
    console.log(`Server is listening to port ${8800}`);
})