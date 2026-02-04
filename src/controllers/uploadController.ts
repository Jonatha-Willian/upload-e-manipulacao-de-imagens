import { RequestHandler } from "express"

export const upload: RequestHandler = (req, res) => {
    console.log(req.body);
    console.log(req.file);
    
    res.json({});
}
