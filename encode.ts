import { encodeFunctionData } from 'viem';
import { TOKEN_CONFIG } from './lib/token/config';
import { MCV2_BOND_ABI } from './contracts/MintClubV2';

const { name, symbol, bondingCurve } = TOKEN_CONFIG;

const encoded = encodeFunctionData({
  abi: MCV2_BOND_ABI,
  functionName: 'createToken',
  args: [
    {
      name,
      symbol,
    },
    {
      mintRoyalty: bondingCurve.mintRoyalty,
      burnRoyalty: bondingCurve.burnRoyalty,
      reserveToken: '0x299c30DD5974BF4D5bFE42C340CA40462816AB07',
      maxSupply: bondingCurve.maxSupply,
      stepRanges: bondingCurve.stepRanges,
      stepPrices: bondingCurve.stepPrices,
    },
  ],
});

console.log(encoded);