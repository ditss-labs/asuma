import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

let stickerToImage = async (m, { conn: Ditss }) => {
    const q = m.quoted;
    
    if (!q) return m.reply('Reply stikernya!');
    if (q.mtype !== 'stickerMessage') return m.reply('Reply stiker!');
    
    try {
        const media = await q.download();
        const timestamp = Date.now();
        const inputPath = `./database/sampah/${timestamp}.webp`;
        
        fs.writeFileSync(inputPath, media);
        
        let outputPath, mediaType, caption;
        
        if (q.isAnimated) {
            outputPath = inputPath.replace('.webp', '.mp4');
            mediaType = 'video';
            caption = '✅ Sticker animasi → Video';
            
            await execAsync(`ffmpeg -i ${inputPath} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${outputPath}`);
        } else {
            outputPath = inputPath.replace('.webp', '.png');
            mediaType = 'image';
            caption = '✅ Sticker → Gambar';
            
            await execAsync(`ffmpeg -i ${inputPath} ${outputPath}`);
        }
        
        await Ditss.sendMessage(m.chat, {
            [mediaType]: fs.readFileSync(outputPath),
            caption: caption
        }, { quoted: m });
        
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
        
    } catch (error) {
        console.error(error);
        return m.reply('Gagal convert sticker');
    }
};

stickerToImage.help = ['toimg'];
stickerToImage.tags = ['converter'];
stickerToImage.command = ['toimg', 'toimage', 'stickertoimg'];

export default stickerToImage;
