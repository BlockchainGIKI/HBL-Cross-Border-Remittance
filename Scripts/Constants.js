config = {
    'Ganache':
    {
        'RPC': 'http://127.0.0.1:7545',
        'TokenManagementContractAddress': '0xB27B756C3C6634297484f009C3e4285FDAD30d78',
        'StablecoinContractAddress': '0x6a135e08C49dCA54989D9e88e9685e54F23383eb',
        'MockEtherContractAddress': '0x53d082dB888a08FBF6110a3F47F8fFA1c60D750c',
        'DSCEngineContractAddress': '0xAEFaD92fd07957e4e5a37D2AF27b6Be0Bb4C4aE4'
    },
    'Sepolia':
    {
        'RPC': 'https://eth-sepolia.g.alchemy.com/v2/demo',
        'StablecoinContractAddress': '0x2f036f934dA47e762A9A21503fC8a0012d335698',
        'DSCEngineContractAddress': '0x2d78b7b6D11A57D1985C1e927fF2c261de46D610'
    }
}

module.exports = { config }