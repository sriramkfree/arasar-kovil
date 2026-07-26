import urllib.request
import json
import re

url = "https://html.duckduckgo.com/html/?q=Arasar+Kovil+Kamala+Varadharajar+temple+photos"
req = urllib.request.Request(
    url, 
    data=None, 
    headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
    }
)

try:
    response = urllib.request.urlopen(req)
    html = response.read().decode('utf-8')
    # find image links
    matches = re.findall(r'img class="image_preview".*?src="(.*?)"', html)
    if matches:
        print("Found images:", matches[:3])
        # duckduckgo proxies images, they start with //
        img_url = matches[0] if matches[0].startswith('http') else "https:" + matches[0]
        urllib.request.urlretrieve(img_url, "public/images/hero-temple.png")
        print("Downloaded to public/images/hero-temple.png")
    else:
        print("No images found")
except Exception as e:
    print(e)
