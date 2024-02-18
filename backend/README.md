Possible improvements

1. .env file for PORTs, coingecko key etc
2. Validation of parameters 

MODIFICATIONS: 

In "coingecko-api-v3" i made 2 changes. 
- Replace x_cg_pro_api_key with x_cg_demo_api_key at line 112.
- In line 37, instead of this.baseURL = CoinGeckoClient.PRO_API_V3_URL, I did it this.baseURL = CoinGeckoClient.API_V3_URL;

Thats beacuse the library doesnt support DEMO API key
I created a patch in order to keep the changes permanent.
