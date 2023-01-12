package main

import (
	_ "embed"
	"fmt"
	"net/http"
	"strings"

	spinhttp "github.com/fermyon/spin/sdk/go/http"
	qrcode "github.com/skip2/go-qrcode"
)

//go:embed docs/dist/index.html
var WebDoc string

func init() {
	spinhttp.Handle(func(w http.ResponseWriter, r *http.Request) {
		prefixActions := map[string]string{
			"/url=":         "",
			"/text=":        "",
			"/tel=":         "tel:",
			"/sms=":         "smsto:",
			"/whatsapp=":    "whatsapp://send?phone=",
			"/mail=":        "mailto:",
			"/bitcoin=":     "bitcoin:",
			"/bitcoincash=": "bitcoincash:",
			"/ethereum=":    "ethereum:",
			"/litecoin=":    "litecoin:",
			"/dash=":        "dash:",
			"/eos=":         "eos:",
			"/ripple=":      "ripple:",
		}

		for prefix, qrType := range prefixActions {
			if len(r.URL.RequestURI()) > len(prefix) && r.URL.RequestURI()[:len(prefix)] == prefix {
				createQrCode(w, qrType+r.URL.RequestURI()[len(prefix):])
				return
			}
		}
		setDefaultResponse(w, r)

	})
}

func setDefaultResponse(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path == "/favicon.ico" {
        return
    }
    buildDocResponse(w, r)
}

func buildDocResponse(w http.ResponseWriter, r *http.Request) {
	if strings.Contains(r.Header.Get("User-Agent"), "curl") {
		buildTerminalDocResponse(w)
	} else {
		buildWebDocResponse(w)
	}
}

func createQrCode(w http.ResponseWriter, text string) {

	text = strings.ReplaceAll(text, "%20", " ")
	text = strings.ReplaceAll(text, "%22", "\"")
	fmt.Println(text)
	var png []byte
	png, err := qrcode.Encode(text, qrcode.Medium, 256)
	if err != nil {
		errorResponse(w, err)
		return
	}
	successResponse(w, png)
}

func successResponse(w http.ResponseWriter, png []byte) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "image/png")
	w.Write(png)
}

func errorResponse(w http.ResponseWriter, err error) {
	w.WriteHeader(http.StatusInternalServerError)
	w.Header().Set("Content-Type", "text/plain")
	fmt.Fprintf(w, err.Error())
}

func buildWebDocResponse(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprintf(w, "%s", WebDoc)
}

func buildTerminalDocResponse(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/plain")
	fmt.Fprint(w, "# toqr.link Terminal Documentation\n")
	fmt.Fprint(w, "-------------------------------\n")
	fmt.Fprint(w, "## URL QR Code\n")
	fmt.Fprint(w, "curl -L toqr.link/url=https://example.com > toqr.png\n\n")
	fmt.Fprint(w, "## Text QR Code\n")
	fmt.Fprint(w, "curl -L \"toqr.link/text=Hello World\" > toqr.png\n\n")
	fmt.Fprint(w, "## Telephone Call QR Code\n")
	fmt.Fprint(w, "curl -L toqr.link/tel=+49123456789 > toqr.png\n\n")
	fmt.Fprint(w, "## SMS QR Code\n")
	fmt.Fprint(w, "curl -L toqr.link/sms=+49123456789:Hello > toqr.png\n\n")
	fmt.Fprint(w, "## Whatsapp Call QR Code\n")
	fmt.Fprint(w, "curl -L toqr.link/whatsapp=+49123456789 > toqr.png\n\n")
	fmt.Fprint(w, "## Whatsapp Message QR Code\n")
	fmt.Fprint(w, "curl -L toqr.link/whatsapp=+49123456789?text=Hello > toqr.png\n\n")
	fmt.Fprint(w, "## Mail Message QR Code(subject and body are optional)\n")
	fmt.Fprint(w, "curl -L \"toqr.link/mail=+49123456789?subject=Hi&body=Whats up\" > toqr.png\n\n")
	fmt.Fprint(w, "## Crypto QR Code\n")
	fmt.Fprint(w, "curl -L toqr.link/bitcoin=1A1zP1eP5Q?amount=1 > toqr.png\n\n")
}

func main() {}
