import { Container, Heading, Select, StatusBadge } from "@medusajs/ui";
import { DeepSeekBalance } from "../../modules/deepseek/types";
import { useState } from "react";

type BalanceProps = {
  balance: DeepSeekBalance;
};

export default function Balance({ balance }: BalanceProps) {
  
  console.log(balance.error);

  const [currencies, _] = useState(
    balance.balance_infos.map((c) => c.currency)
  );
  const [currentCurrency, setCurrentCurrency] = useState(currencies[0]);

  const [balanceData, setBalanceData] = useState(balance.balance_infos.filter(c=>c.currency==currentCurrency)[0])

  const changeCurrencyHanddle = (currency: string) => {

    setBalanceData(balance.balance_infos.filter(c=>c.currency==currency)[0])
    setCurrentCurrency(currency);
  } 

  return (
    <div>
      <div className="flex pb-8">
        <Heading level="h2" className="flex-1 text-3xl font-bold">
          <div className="flex items-center">
            <span className="mr-2">Balance</span>
            <StatusBadge color={balance.is_available ? 'green' : 'red'}>{balance.is_available ? 'Active' : 'Deactivate'}</StatusBadge>

          </div>
        </Heading>

        <div className=" flex-none">
          <Select onValueChange={changeCurrencyHanddle} defaultValue={currentCurrency}>
            <Select.Trigger>
              <Select.Value placeholder="Select a currency" />
            </Select.Trigger>
            <Select.Content>
              {currencies.map((currencie) => (
                <Select.Item key={currencie} value={currencie}>
                  {currencie}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Container className="flex flex-col">
          <h3 className="font-bold">Total</h3>
          <p className="text-xs py-2 text-gray-500">The total available balance</p>
          <p className="font-mono text-3xl font-bold">{balanceData.total_balance}<span className="px-2 text-base font-light">{currentCurrency}</span></p>

        </Container>

        <Container>
        <h3 className="font-bold">Topped Up</h3>
        <p className="text-xs py-2 text-gray-500">The total topped-up balance.</p>
        <p className="font-mono text-3xl font-bold">{balanceData.topped_up_balance}<span className="px-2 text-base font-light">{currentCurrency}</span></p>
        </Container>

        <Container>
        <h3 className="font-bold">Granted</h3>
        <p className="text-xs py-2 text-gray-500">The total not expired granted balance.</p>

        <p className="font-mono text-3xl font-bold">{balanceData.granted_balance}<span className="px-2 text-base font-light">{currentCurrency}</span></p>
        </Container>
        
      </div>
    </div>
  );
}
