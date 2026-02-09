import { RequestHandler } from "express"
import sharp from "sharp";
import { v4 } from "uuid";
import fs from 'node:fs/promises';

export const upload: RequestHandler =  async (req, res) => {
    if(req.file) {
        // Gerar um nome único para a imagem usando v4() do uuid e adicionar a extensão .jpg
        const newName = v4() + '.jpg';

        const miniatura = await sharp(req.file.path)
            .resize(100, 100, { fit: "cover" }) // Redimensionar a imagem para 100 pixels largura e 100 pixels de altura
            .toFile ('./public/images/mini-' + newName)
        // Usar o Sharp para processar a imagem e salvá-la na pasta public/images com o novo nome
        const image = await sharp(req.file.path)
            .resize(500, 500, { fit: "cover" }) // Redimensionar a imagem para 500 pixels largura e 500 pixels de altura 
            .composite([{ input: './src/assets/gato-gordo.png', gravity: 'southeast' }]) // Adicionar uma marca d'água no canto inferior direito
            .toFormat('jpg')
            .toFile('./public/images/' + newName);
        
        // Remover o arquivo temporário criado pelo multer usando fs.unlink, e tratando possíveis erros
        await fs.unlink(req.file.path).catch(err => {
            console.error("Erro ao remover arquivo temporário:", err);
        });
    } else {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }
    
    res.json({});
}
