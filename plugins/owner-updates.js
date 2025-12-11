import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

let update = async (m, { conn: Ditss, text, reply, usedPrefix, editp }) => {
  if (!m.isOwner) return reply("❌ Owner only");
  
  await m.react("🔄");
  
  const GITHUB_REPO = "ditss-labs/asuma";
  
  try {
    const isGitRepo = fs.existsSync(".git");
    
    if (!isGitRepo) {
      await m.react("❌");
      return reply(`❌ Bukan git repo\nClone dulu:\ngit clone https://github.com/${GITHUB_REPO}`);
    }
    
    const loading = await reply(`⏳ Cek update...\nRepo: ${GITHUB_REPO}\nTree: main`);
    
    const targetBranch = text || "main";
    
    const { stdout: currentBranchOutput } = await execAsync("git branch --show-current");
    const currentBranch = currentBranchOutput.trim();
    
    await editp(
      loading.key,
      `📌 Branch: ${currentBranch}\n🎯 Target: ${targetBranch}\n🔍 Cek update...`
    );
    
    await execAsync("git fetch origin");
    
    const { stdout: statusOutput } = await execAsync(
      `git rev-list HEAD..origin/${targetBranch} --count`
    );
    const updateCount = parseInt(statusOutput.trim());
    
    if (updateCount === 0) {
      await m.react("✅");
      return await editp(
        loading.key,
        `✅ Sudah terbaru\n📌 Branch: ${currentBranch}\n🔄 Target: ${targetBranch}\n✨ No new commits`
      );
    }
    
    const { stdout: logOutput } = await execAsync(
      `git log HEAD..origin/${targetBranch} --oneline --pretty=format:"%h - %s" -n 5`
    );
    
    let updateInfo = `🔄 Update tersedia: ${updateCount} commit\n\n`;
    updateInfo += `📌 Current: ${currentBranch}\n🎯 Target: ${targetBranch}\n\n`;
    updateInfo += `📝 Changes:\n`;
    
    if (logOutput.trim()) {
      updateInfo += logOutput.split('\n').map(line => `  • ${line}`).join('\n');
    }
    
    updateInfo += `\n\n⏳ Backup database...`;
    
    await editp(loading.key, updateInfo);
    
    const backupDir = "backup_update";
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const PROTECTED_FILES = ["database/database.json"];
    
    if (fs.existsSync("database/users")) {
      const userFiles = fs.readdirSync("database/users")
        .filter(file => file.endsWith(".json"))
        .map(file => `database/users/${file}`);
      
      PROTECTED_FILES.push(...userFiles);
    }
    
    const backups = [];
    for (const file of PROTECTED_FILES) {
      if (fs.existsSync(file)) {
        const backupFile = `${backupDir}/${path.basename(file)}_${Date.now()}.json`;
        fs.copyFileSync(file, backupFile);
        backups.push({ original: file, backup: backupFile });
      }
    }
    
    updateInfo += `\n✅ Backup ${backups.length} file database`;
    
    await editp(loading.key, updateInfo);
    
    try {
      await execAsync("git stash");
    } catch (e) {}
    
    if (currentBranch !== targetBranch) {
      updateInfo += `\n\n🔄 Switch to ${targetBranch}...`;
      await editp(loading.key, updateInfo);
      
      try {
        await execAsync(`git checkout ${targetBranch}`);
      } catch (e) {
        await execAsync(`git checkout -b ${targetBranch} origin/${targetBranch}`);
      }
    }
    
    updateInfo += `\n\n📥 Pull update...`;
    await editp(loading.key, updateInfo);
    
    const { stdout: pullOutput } = await execAsync(`git pull origin ${targetBranch}`);
    
    for (const { original, backup } of backups) {
      if (fs.existsSync(backup) && fs.existsSync(original)) {
        fs.copyFileSync(backup, original);
      }
    }
    
    if (fs.existsSync(backupDir)) {
      fs.rmSync(backupDir, { recursive: true, force: true });
    }
    
    if (pullOutput.includes("package.json")) {
      updateInfo += `\n\n📦 Install deps...`;
      await editp(loading.key, updateInfo);
      
      try {
        await execAsync("npm install");
      } catch (npmError) {}
    }
    
    try {
      await execAsync("git stash pop");
    } catch (e) {}
    
    let successMsg = `✅ Update berhasil!\n\n`;
    successMsg += `📌 Branch: ${targetBranch}\n`;
    successMsg += `✨ Applied: ${updateCount} commit\n`;
    successMsg += `💾 Database: ${PROTECTED_FILES.length} file aman\n\n`;
    
    if (logOutput.trim()) {
      successMsg += `📝 Changes:\n`;
      successMsg += logOutput.split('\n').slice(0, 3)
        .map(line => `  • ${line.split(' - ')[1] || line}`)
        .join('\n');
      
      if (updateCount > 3) {
        successMsg += `\n  ...+${updateCount - 3} more`;
      }
    }
    
    successMsg += `\n\n⚠️ Restart bot: ${usedPrefix}restart`;
    
    await editp(loading.key, successMsg);
    
    await m.react("✅");
    
    console.log(`[UPDATE] Updated ${targetBranch} +${updateCount} commits (protected: ${PROTECTED_FILES.length} files)`);
    
  } catch (error) {
    console.error("Update error:", error);
    await m.react("❌");
    
    let errorMsg = `❌ Update gagal\n\n`;
    
    if (error.message.includes("not a git repository")) {
      errorMsg += `💡 Clone dulu:\ngit clone https://github.com/${GITHUB_REPO}`;
    } else if (error.message.includes("could not resolve host")) {
      errorMsg += `💡 Cek koneksi internet`;
    } else if (error.message.includes("branch")) {
      errorMsg += `💡 Coba:\n${usedPrefix}update main`;
    } else {
      errorMsg += `💡 Manual:\n\`git pull\`\n\`npm install\``;
    }
    
    await reply(errorMsg);
  }
};

update.help = ["update"];
update.tags = ["owner"];
update.command = ["update", "up", "gitpull"];
update.owner = true;

export default update;
