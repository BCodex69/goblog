import requests
import urllib3

# Abaikan peringatan SSL
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Informasi proxy SOCKS5
proxy_base = "V5qoMKIvlg9r5pJz:AueMgLigzkNDKU1D_country-ph_city-mandaluyongcity@geo.iproyal.com"
start_port = 51200
end_port = 51250

# Fungsi untuk mengecek proxy SOCKS5
def check_proxy(proxy_address, port):
    proxies = {
        'http': f'socks5://{proxy_address}:{port}',
        'https': f'socks5://{proxy_address}:{port}',
    }
    try:
        # Mengabaikan verifikasi SSL untuk menghindari SSL error
        response = requests.get('https://httpbin.org/ip', proxies=proxies, timeout=5, verify=False)
        print(f"Port {port}: {response.json()['origin']}")
    except requests.exceptions.RequestException as e:
        print(f"Port {port}: Failed ({e})")

# Looping untuk mengecek semua port
for port in range(start_port, end_port + 1):
    check_proxy(proxy_base, port)