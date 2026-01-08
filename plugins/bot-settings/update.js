import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const axios = require('axios');

let updateHandler = async (m, { conn: Ditss, args, usedPrefix }) => {
    const command = m.text.split(' ')[0].slice(1).toLowerCase();
    const sender = m.sender.split('@')[0];
    const owner = global.owner || '6281513607731';
    const isOwner = Array.isArray(owner) ? owner.includes(sender) : owner === sender;
    
    if (!isOwner) return Ditss.sendMessage(m.chat, { text: global.ress?.owner || '❌ Fitur khusus owner!' }, { quoted: m });

    let lastMessageKey = null;
    
    const editMessage = async (text, options = {}) => {
        try {
            if (lastMessageKey) {
                const result = await Ditss.sendMessage(m.chat, { text, ...options }, { edit: lastMessageKey });
                return result;
            } else {
                const result = await Ditss.sendMessage(m.chat, { text, ...options }, { quoted: m });
                lastMessageKey = result.key;
                return result;
            }
        } catch (error) {
            const result = await Ditss.sendMessage(m.chat, { text, ...options }, { quoted: m });
            lastMessageKey = result.key;
            return result;
        }
    };

    const updateProgress = async (current, total, message) => {
        const percent = Math.round((current / total) * 100);
        const progressBar = '█'.repeat(Math.floor(percent / 10)) + '░'.repeat(10 - Math.floor(percent / 10));
        await editMessage(`🔄 ${message}\n${progressBar} ${percent}% (${current}/${total})`);
    };

    if (command === 'update' || command === 'up') {
        lastMessageKey = null;
        
        try {
            await editMessage('🔍 *Mengecek update dari GitHub...*');
            
            const repoApi = 'https://api.github.com/repos/ditss-labs/asuma/git/trees/main?recursive=1';
            const response = await axios.get(repoApi);
            
            if (response.status !== 200) throw new Error(`Gagal mengambil data: ${response.status}`);
            
            const tree = response.data.tree;
            const filesToCheck = tree.filter(item => item.type === 'blob');
            
            await editMessage(`📁 Ditemukan ${filesToCheck.length} file di repo\n🔄 Membandingkan dengan file lokal...`);
            
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
            
            let checkedCount = 0;
            
            for (const file of filesToCheck) {
                checkedCount++;
                if (checkedCount % 10 === 0) {
                    await updateProgress(checkedCount, filesToCheck.length, 'Memeriksa file...');
                }
                
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
                        } catch (error) {
                            localHash = 'FILE_ERROR';
                        }
                    }
                    
                    if (!localExists || localHash !== githubHash) {
                        filesToUpdate.push({ 
                            path: filePath, 
                            url: rawUrl, 
                            buffer: githubBuffer, 
                            status: localExists ? 'UPDATE' : 'NEW',
                            size: githubBuffer.length
                        });
                    }
                } catch (error) {
                    continue;
                }
            }
            
            if (filesToUpdate.length === 0) {
                await editMessage('✅ *Bot sudah versi terbaru!*\n\nTidak ada file yang perlu diupdate.');
                return;
            }
            
            const totalSize = filesToUpdate.reduce((sum, file) => sum + file.size, 0);
            const sizeText = totalSize > 1024 * 1024 ? `${(totalSize / (1024 * 1024)).toFixed(2)} MB` : `${Math.round(totalSize / 1024)} KB`;
            
            let updateMessage = `🔄 *UPDATE TERSEDIA!*\n\n`;
            updateMessage += `📊 **Statistik:**\n`;
            updateMessage += `├ 📁 Total file: ${filesToUpdate.length}\n`;
            updateMessage += `├ 📦 Total size: ${sizeText}\n`;
            updateMessage += `├ 🆕 File baru: ${filesToUpdate.filter(f => f.status === 'NEW').length}\n`;
            updateMessage += `└ 📝 File update: ${filesToUpdate.filter(f => f.status === 'UPDATE').length}\n\n`;
            
            updateMessage += `📋 **Daftar file:**\n`;
            const previewFiles = filesToUpdate.slice(0, 8);
            previewFiles.forEach((f, i) => {
                const size = f.size > 1024 ? `${(f.size / 1024).toFixed(1)}KB` : `${f.size}B`;
                updateMessage += `${f.status === 'NEW' ? '🆕' : '📝'} ${f.path} (${size})\n`;
            });
            
            if (filesToUpdate.length > 8) {
                updateMessage += `└ ...dan ${filesToUpdate.length - 8} file lainnya\n`;
            }
            
            updateMessage += `\n⚠️ **Konfirmasi Update:**\n`;
            updateMessage += `Ketik *${usedPrefix}confirmupdate* untuk melanjutkan\n`;
            updateMessage += `Ketik *${usedPrefix}cancel* untuk membatalkan`;
            
            global.pendingUpdate = { 
                files: filesToUpdate, 
                total: filesToUpdate.length,
                totalSize: totalSize,
                startTime: Date.now()
            };
            
            await editMessage(updateMessage);
            
        } catch (error) {
            console.error('Update check error:', error);
            
            let errorMsg = '❌ *Gagal cek update!*\n\n';
            if (error.response?.status === 403) {
                errorMsg += '📛 **API Rate Limit Tercapai**\n';
                errorMsg += 'GitHub membatasi request API.\n';
                errorMsg += 'Coba lagi dalam 1-2 jam.\n\n';
                errorMsg += '📌 *Tips:* Gunakan update manual dengan download dari GitHub.';
            } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
                errorMsg += '🌐 **Tidak bisa terkoneksi ke GitHub**\n';
                errorMsg += 'Periksa koneksi internet Anda.\n';
                errorMsg += 'Atau GitHub mungkin sedang down.\n\n';
                errorMsg += '⚠️ Coba lagi beberapa menit kemudian.';
            } else if (error.response?.status === 404) {
                errorMsg += '🔍 **Repository tidak ditemukan**\n';
                errorMsg += 'Repository mungkin dihapus atau dipindahkan.\n';
                errorMsg += 'Pastikan repo masih tersedia di: https://github.com/ditss-labs/asuma';
            } else {
                errorMsg += `📛 **Error:** ${error.message || 'Unknown error'}\n`;
                errorMsg += `🔧 Status: ${error.response?.status || 'N/A'}`;
            }
            
            await editMessage(errorMsg);
        }
    }

    else if (command === 'confirmupdate' || command === 'confirmup') {
        if (!global.pendingUpdate) {
            return editMessage('❌ **Tidak ada update yang tertunda.**\n\nGunakan *.update* dulu untuk cek update.');
        }
        
        const { files, total, totalSize, startTime } = global.pendingUpdate;
        const sizeText = totalSize > 1024 * 1024 ? `${(totalSize / (1024 * 1024)).toFixed(2)} MB` : `${Math.round(totalSize / 1024)} KB`;
        
        await editMessage(`⬇️ *Memulai download ${total} file...*\n📦 Total: ${sizeText}\n\n⏳ Estimasi: ${Math.ceil(total / 10)} detik...`);
        
        let successCount = 0;
        let failCount = 0;
        const failedFiles = [];
        const npmUpdated = files.some(f => f.path === 'package.json');
        
        const backupDir = `.backup_${Date.now()}`;
        try {
            await fs.promises.mkdir(backupDir, { recursive: true });
        } catch {}
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            if (i % 5 === 0 || i === files.length - 1) {
                await updateProgress(i + 1, files.length, 'Mengupdate file...');
            }
            
            try {
                try {
                    if (await fs.promises.access(file.path).then(() => true).catch(() => false)) {
                        const backupPath = path.join(backupDir, file.path);
                        const backupDirPath = path.dirname(backupPath);
                        await fs.promises.mkdir(backupDirPath, { recursive: true });
                        await fs.promises.copyFile(file.path, backupPath);
                    }
                } catch {}
                
                const dir = path.dirname(file.path);
                if (dir !== '.') {
                    await fs.promises.mkdir(dir, { recursive: true });
                }
                
                await fs.promises.writeFile(file.path, file.buffer);
                successCount++;
            } catch (error) {
                console.error(`Gagal update ${file.path}:`, error.message);
                failCount++;
                failedFiles.push({ file: file.path, error: error.message });
            }
        }
        
        const elapsedTime = Math.round((Date.now() - startTime) / 1000);
        
        delete global.pendingUpdate;
        
        let resultMsg = `📊 **UPDATE SELESAI!**\n\n`;
        resultMsg += `⏱️ Waktu: ${elapsedTime} detik\n`;
        resultMsg += `✅ Berhasil: ${successCount} file\n`;
        resultMsg += `❌ Gagal: ${failCount} file\n`;
        
        if (backupDir) {
            resultMsg += `💾 Backup: ${backupDir}\n`;
        }
        
        if (failCount > 0) {
            resultMsg += `\n📛 **File yang gagal:**\n`;
            failedFiles.slice(0, 5).forEach(f => {
                resultMsg += `├ ${f.file}\n`;
            });
            if (failedFiles.length > 5) {
                resultMsg += `└ ...dan ${failedFiles.length - 5} lainnya\n`;
            }
        }
        
        if (npmUpdated) {
            resultMsg += `\n📦 **package.json telah diupdate**\n`;
            resultMsg += `Jalankan *${usedPrefix}npm* untuk update dependency\n`;
        }
        
        resultMsg += `\n⚠️ **Bot akan restart dalam 10 detik...**\n`;
        resultMsg += `Ketik *${usedPrefix}cancel* sebelum restart untuk membatalkan restart.`;
        
        await editMessage(resultMsg);
        
        const restartTimeout = setTimeout(async () => {
            await editMessage('🚀 **Restarting bot...**\n\nMohon tunggu beberapa detik.');
            setTimeout(() => {
                process.exit(1);
            }, 2000);
        }, 10000);
        
        global.restartTimeout = restartTimeout;
    }

    else if (command === 'npm' || command === 'npminstall') {
        try {
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);
            
            await editMessage('📦 *Installing dependencies...*\n\n⏳ Ini mungkin memakan waktu beberapa menit...');
            
            const { stdout, stderr } = await execAsync('npm install --no-audit --no-fund', { timeout: 300000 });
            
            let result = '✅ **Dependencies updated!**\n\n';
            
            if (stdout.includes('added')) {
                const addedMatch = stdout.match(/(\d+) packages? added/);
                if (addedMatch) result += `➕ ${addedMatch[1]} packages ditambahkan\n`;
            }
            if (stdout.includes('removed')) {
                const removedMatch = stdout.match(/(\d+) packages? removed/);
                if (removedMatch) result += `➖ ${removedMatch[1]} packages dihapus\n`;
            }
            if (stdout.includes('updated')) {
                const updatedMatch = stdout.match(/(\d+) packages? updated/);
                if (updatedMatch) result += `🔄 ${updatedMatch[1]} packages diupdate\n`;
            }
            
            if (stdout.includes('audited')) {
                const auditMatch = stdout.match(/audited (\d+) packages?/);
                if (auditMatch) result += `🔍 ${auditMatch[1]} packages diaudit\n`;
            }
            
            const vulnerabilityMatch = stdout.match(/(\d+) (low|moderate|high|critical) severity vulnerabilities?/);
            if (vulnerabilityMatch) {
                result += `\n⚠️ **${vulnerabilityMatch[1]} ${vulnerabilityMatch[2]} vulnerabilities ditemukan**\n`;
                result += `Jalankan *npm audit* untuk detail`;
            } else {
                result += `✅ **Tidak ada vulnerability**\n`;
            }
            
            result += `\n🚀 Bot siap digunakan!`;
            
            await editMessage(result);
        } catch (error) {
            let errorMsg = '❌ **Gagal npm install!**\n\n';
            
            if (error.code === 'ETIMEDOUT' || error.killed) {
                errorMsg += '⏱️ **Timeout!**\n';
                errorMsg += 'Proses terlalu lama. Coba jalankan manual di terminal:\n';
                errorMsg += '```npm install --no-audit --no-fund```';
            } else if (error.stderr?.includes('ERR!')) {
                errorMsg += '📛 **NPM Error:**\n';
                errorMsg += '```' + error.stderr.split('\n').slice(-5).join('\n') + '```';
            } else {
                errorMsg += `📛 **Error:** ${error.message}\n`;
            }
            
            await editMessage(errorMsg);
        }
    }

    else if (command === 'cancel') {
        if (global.pendingUpdate) {
            delete global.pendingUpdate;
            await editMessage('❎ **Update dibatalkan.**\n\nTidak ada file yang diubah.');
        } else if (global.restartTimeout) {
            clearTimeout(global.restartTimeout);
            delete global.restartTimeout;
            await editMessage('❎ **Restart dibatalkan.**\n\nBot tidak akan restart.');
        } else {
            await editMessage('❌ **Tidak ada proses yang sedang berjalan.**\n\nTidak ada yang perlu dibatalkan.');
        }
    }
}

updateHandler.command = ['update', 'up', 'confirmupdate', 'confirmup', 'npm', 'npminstall', 'cancel'];
updateHandler.tags = ['owner', 'system'];
updateHandler.owner = true;

export default updateHandler;
