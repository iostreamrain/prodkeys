import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prodkeysDir = path.join(__dirname, '..', 'prodkeys');
const outputFile = path.join(__dirname, '..', 'src', '_data', 'versions.json');

/**
 * 从文件名中提取版本号，统一处理各种不规范命名
 */
function extractVersion(filename) {
  // 去掉扩展名
  let name = filename.replace(/\.zip$/, '');

  // 特殊情况：switchKeys.io-v18.-1-0 → 18.0.0（命名错误）
  if (name.includes('v18.-1-0') || name.includes('v18.-1')) {
    return '18.0.0';
  }

  // 特殊情况：switchKeys.io-16 → 16.0.0
  if (/^switchKeys\.io-16$/.test(name)) {
    return '16.0.0';
  }

  // 特殊情况：switchKeys.io-18-0-1 → 18.0.1（用连字符分隔版本）
  const dashVersion = name.match(/[-_](\d+)-(\d+)-(\d+)$/);
  if (dashVersion) {
    return `${dashVersion[1]}.${dashVersion[2]}.${dashVersion[3]}`;
  }

  // 标准格式：vX.Y.Z 或 X.Y.Z
  const vMatch = name.match(/[vV]?(\d+\.\d+\.\d+)/);
  if (vMatch) return vMatch[1];

  // 两段版本号：X.Y
  const twoPartMatch = name.match(/[vV]?(\d+\.\d+)$/);
  if (twoPartMatch) return `${twoPartMatch[1]}.0`;

  // 纯数字
  const numMatch = name.match(/(\d{2,3})$/);
  if (numMatch) return `${numMatch[1]}.0.0`;

  return '0.0.0';
}

/**
 * 从文件名提取来源
 */
function extractSource(filename) {
  if (filename.toLowerCase().startsWith('prodkeys')) return 'ProdKeys';
  if (filename.toLowerCase().startsWith('switchkeys')) return 'switchKeys.io';
  return 'Unknown';
}

/**
 * 格式化文件大小
 */
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

/**
 * 语义化版本比较
 */
function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

/**
 * 生成 slug（用于 URL）
 */
function makeSlug(version) {
  return version.replace(/\./g, '-');
}

// 扫描目录
if (!fs.existsSync(prodkeysDir)) {
  console.error(`目录不存在: ${prodkeysDir}`);
  process.exit(1);
}

const files = fs.readdirSync(prodkeysDir).filter(f => f.endsWith('.zip'));
const versionMap = new Map(); // 用于去重，保留文件名更短/更简洁的

files.forEach(filename => {
  const version = extractVersion(filename);
  const stats = fs.statSync(path.join(prodkeysDir, filename));
  const source = extractSource(filename);

  const entry = {
    version,
    slug: makeSlug(version),
    filename,
    source,
    fileSize: formatFileSize(stats.size),
    fileSizeBytes: stats.size,
    downloadUrl: `/prodkeys/${filename}`,
    lastModified: stats.mtime.toISOString().split('T')[0]
  };

  // 去重：同版本保留 ProdKeys 来源优先；否则保留更新的文件
  if (!versionMap.has(version)) {
    versionMap.set(version, entry);
  } else {
    const existing = versionMap.get(version);
    // ProdKeys 来源优先
    if (source === 'ProdKeys' && existing.source !== 'ProdKeys') {
      versionMap.set(version, entry);
    }
    // 同来源保留更大的文件（通常内容更完整）
    else if (source === existing.source && stats.size > existing.fileSizeBytes) {
      versionMap.set(version, entry);
    }
  }
});

// 按版本降序排列
const versions = Array.from(versionMap.values())
  .sort((a, b) => compareVersions(b.version, a.version));

fs.writeFileSync(outputFile, JSON.stringify(versions, null, 2));

console.log(`✅ 已生成 ${versions.length} 个版本记录到 ${outputFile}`);
console.log('版本列表（降序）:');
versions.forEach((v, i) => {
  const latest = i === 0 ? ' ← 最新' : '';
  console.log(`  ${v.version.padEnd(10)} ${v.source.padEnd(15)} ${v.fileSize.padEnd(10)} ${v.filename}${latest}`);
});
