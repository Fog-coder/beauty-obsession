import sharp from 'sharp';
import {stat} from 'node:fs/promises';
const assets={fiore:'../design/asset-originali/fiore.png',pelle:'../design/asset-originali/pelle.png',piedi:'../design/asset-originali/piedi.png',gabriela:'../ricerca/media/team-avatar-instagram.jpg'};
for(const [name,path] of Object.entries(assets)){
 await sharp(path).resize({width:1440,withoutEnlargement:true}).webp({quality:85,effort:6}).toFile(`public/media/${name}.webp`);
 await sharp(path).resize({width:640,withoutEnlargement:true}).webp({quality:80,effort:6}).toFile(`public/media/${name}-640.webp`);
 console.log(name,Math.round((await stat(`public/media/${name}.webp`)).size/1024)+' KB');
}
await sharp(assets.fiore).resize({width:1440}).avif({quality:62,effort:6}).toFile('public/media/fiore.avif');
await sharp('../ricerca/media/logo-ritaglio.png').resize({width:240}).webp({quality:92}).toFile('public/media/logo.webp');
