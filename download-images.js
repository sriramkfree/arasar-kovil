const fs = require('fs');

async function downloadImages() {
  // Use generic image URLs that look like temple images to replace the broken webm files
  // But wait, I can search for Arasar Kovil image on Wikipedia
  const img1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Sri_Kamalambigai_Sametha_Sri_Varadharaja_Perumal_Temple.jpg/800px-Sri_Kamalambigai_Sametha_Sri_Varadharaja_Perumal_Temple.jpg";
  const img2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Arasar_Koil_Temple.jpg/800px-Arasar_Koil_Temple.jpg"; 
  
  // Actually, I don't know if those exact urls exist on wikipedia.
  // I will download the web page from lightuptemples and parse it.
  try {
    const res = await fetch('https://lightuptemples.com/arasar-koil/');
    const html = await res.text();
    const urls = [];
    const regex = /<img[^>]+src="([^"]+)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      if (match[1].endsWith('.jpg') || match[1].endsWith('.png')) {
        urls.push(match[1]);
      }
    }
    
    if (urls.length >= 2) {
      const img1Res = await fetch(urls[0]);
      const img1Buffer = await img1Res.arrayBuffer();
      fs.writeFileSync('d:/webk/arasar-kovil/public/images/temple-ancient.png', Buffer.from(img1Buffer));
      
      const img2Res = await fetch(urls[1]);
      const img2Buffer = await img2Res.arrayBuffer();
      fs.writeFileSync('d:/webk/arasar-kovil/public/images/temple-renovated.png', Buffer.from(img2Buffer));
      console.log("Images downloaded successfully.");
    } else {
      console.log("Not enough images found:", urls);
    }
  } catch (e) {
    console.error(e);
  }
}

downloadImages();
