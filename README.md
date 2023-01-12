# toqr.link
A WASM Serverless Project for creating or embedding QR Codes on the Fly.


## toqr.link Website Documentation
<a href="https://toqr.link">
toqr.link
</a>


## Embed QR Codes in your site

```
<img
    alt="QR Code Website"
    src="https://toqr.link/url=https://example.com"
/>

```


## toqr.link Terminal Documentation

Get Documentation
```
curl -L toqr.link
```

URL QR Code
```
curl -L toqr.link/url=https://example.com > toqr.png
```

Text QR Code
```
curl -L "toqr.link/text=Hello World" > toqr.png
```

Telephone Call QR Code
```
curl -L toqr.link/tel=+49123456789 > toqr.png
```

SMS QR Code
```
curl -L toqr.link/sms=+49123456789:Hello > toqr.png
```

Whatsapp Call QR Code
```
curl -L toqr.link/whatsapp=+49123456789 > toqr.png
```

Whatsapp Message QR Code
```
curl -L toqr.link/whatsapp=+49123456789?text=Hello > toqr.png
```

Mail Message QR Code(subject and body are optional)
```
curl -L "toqr.link/mail=+49123456789?subject=Hi&body=Whats up" > toqr.png
```

Crypto QR Code
```
curl -L toqr.link/bitcoin=1A1zP1eP5Q?amount=1 > toqr.png
```

