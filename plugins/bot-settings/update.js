import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import axios from 'axios';

let updateHandler = async (m, { conn: Ditss, args, usedPrefix }) => {
    const command = m.text.split(' ')[0].slice(1).toLowerCase();
    const sender = m.sender.split('@')[0];
    const owner = global.owner || '6281513607731';
    const isOwner = Array.isArray(owner) ? owner.includes(sender) : owner === sender;
    
    if (!isOwner) return m.reply('❌ Fitur khusus owner!');

    if (command === 'update' || command === 'up') {
        const msg = await m.reply('🔍 *Mengecek update dari GitHub...*');
        
        try {
            const repoApi = 'https://api.github.com/repos/ditss-labs/asuma/git/trees/main?recursive=1';
            const response = await axios.get(repoApi);
            
            if (response.status !== 200) throw new Error(`Gagal mengambil data: ${response.status}`);
            
            const tree = response.data.tree;
            const filesToCheck = tree.filter(item => item.type === 'blob');
            
            const filesToUpdate = [];
            const skipPatterns = [
                /^database\//, 
                /^config\.js$/, 
                /^baileys_store\.json$/, 
                /^\.tmp\//, 
                /^\.git\//, 
                /^node_modules\//,
                /^session\//,
                /^lib\/(session|tmp)\//,
                /\.log$/,
                /^cache\//
            ];
            
            for (const file of filesToCheck) {
                const filePath = file.path;
                const shouldSkip = skipPatterns.some(pattern => pattern.test(filePath));
                if (shouldSkip) continue;
                
                const rawUrl = `https://raw.githubusercontent.com/ditss-labs/asuma/main/${filePath}`;
                
                try {
                    const [localExists, githubContent] = await Promise.all([
                        fs.promises.access(filePath).then(() => true).catch(() => false),
                        axios.get(rawUrl, { responseType: 'arraybuffer', timeout: 15000 })
                    ]);
                    
                    if (githubContent.status !== 200) continue;
                    
                    const githubBuffer = Buffer.from(githubContent.data);
                    const githubHash = crypto.createHash('sha256').update(githubBuffer).digest('hex');
                    
                    let localHash = '';
                    if (localExists) {
                        try {
                            const localBuffer = await fs.promises.readFile(filePath);
                            localHash = crypto.createHash('sha256').update(localBuffer).digest('hex');
                        } catch {
                            localHash = 'FILE_ERROR';
                        }
                    }
                    
                    if (!localExists || localHash !== githubHash) {
                        filesToUpdate.push({ 
                            path: filePath, 
                            url: rawUrl, 
                            buffer: githubBuffer, 
                            status: localExists ? 'UPDATE' : 'NEW'
                        });
                    }
                } catch {
                    continue;
                }
            }
            
            if (filesToUpdate.length === 0) {
                return m.reply('✅ *Bot sudah versi terbaru!*\n\nTidak ada file yang perlu diupdate.');
            }
            
            let updateMessage = `🔄 *UPDATE TERSEDIA!*\n\n`;
            updateMessage += `📁 Total file: ${filesToUpdate.length}\n`;
            
            updateMessage += `📋 **File yang akan diupdate:**\n`;
            
            // Hanya tampilkan 5 file pertama
            filesToUpdate.slice(0, 5).forEach(f => {
                updateMessage += `${f.status === 'NEW' ? '🆕' : '📝'} ${f.path}\n`;
            });
            
            if (filesToUpdate.length > 5) {
                updateMessage += `└ ...dan ${filesToUpdate.length - 5} file lainnya\n`;
            }
            
            updateMessage += `\n⚠️ **Konfirmasi Update:**\n`;
            updateMessage += `Ketik *${usedPrefix}confirmupdate* untuk melanjutkan\n`;
            updateMessage += `Ketik *${usedPrefix}cancel* untuk membatalkan`;
            
            global.pendingUpdate = { 
                files: filesToUpdate, 
                total: filesToUpdate.length
            };
            
            m.reply(updateMessage);
            
        } catch (error) {
            console.error('Update check error:', error);
            
            let errorMsg = '❌ *Gagal cek update!*\n';
            if (error.response?.status === 403) {
                errorMsg += 'API GitHub limit, coba lagi nanti.';
            } else {
                errorMsg += `Error: ${error.message}`;
            }
            
            m.reply(errorMsg);
        }
    }

    else if (command === 'confirmupdate' || command === 'confirmup') {
        if (!global.pendingUpdate) {
            return m.reply('❌ Tidak ada update yang tertunda.');
        }
        
        const { files, total } = global.pendingUpdate;
        
        const msg = await m.reply(`⬇️ *Mengupdate ${total} file...*`);
        
        let successCount = 0;
        let failCount = 0;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            try {
                const dir = path.dirname(file.path);
                if (dir !== '.') await fs.promises.mkdir(dir, { recursive: true });
                await fs.promises.writeFile(file.path, file.buffer);
                successCount++;
            } catch {
                failCount++;
            }
        }
        
        delete global.pendingUpdate;
        
        let resultMsg = `📊 *UPDATE SELESAI!*\n\n`;
        resultMsg += `✅ Berhasil: ${successCount} file\n`;
        resultMsg += `❌ Gagal: ${failCount} file\n`;
        
        const npmUpdated = files.some(f => f.path === 'package.json');
        if (npmUpdated) {
            resultMsg += `\n📦 **package.json telah diupdate**\n`;
            resultMsg += `Jalankan *${usedPrefix}npm* untuk update dependency\n`;
        }
        
        resultMsg += `\n🔄 *Bot akan restart...*`;
        
        m.reply(resultMsg);
        
        setTimeout(() => {
            Ditss.sendMessage(m.chat, { text: '🚀 Restarting...' }).then(() => {
                process.exit(0);
            });
        }, 2000);
    }

    else if (command === 'npm' || command === 'npminstall') {
        const msg = await m.reply('📦 *Installing dependencies...*');
        
        try {
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);
            
            const { stdout } = await execAsync('npm install --no-audit --no-fund', { timeout: 180000 });
            
            let result = '✅ *Dependencies updated!*\n';
            result += '🚀 Bot siap digunakan!';
            
            m.reply(result);
        } catch (error) {
            m.reply('❌ Gagal npm install');
        }
    }

    else if (command === 'cancel') {
        if (global.pendingUpdate) {
            delete global.pendingUpdate;
            m.reply('❎ Update dibatalkan.');
        } else {
            m.reply('❌ Tidak ada update yang tertunda.');
        }
    }
};

updateHandler.command = ['update', 'up', 'confirmupdate', 'confirmup', 'npm', 'npminstall', 'cancel'];
updateHandler.tags = ['owner', 'system'];
updateHandler.owner = true;

export default updateHandler;
