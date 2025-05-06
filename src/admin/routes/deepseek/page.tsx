import { defineRouteConfig } from "@medusajs/admin-sdk";
import { useLoaderData } from "react-router-dom";
// import { Button, Container, } from "@medusajs/ui";
import DeepSeekLogo from "../../icons/logo";
import DeepSeekIcon from "../../icons/sidebar-logo";
// import { useState } from "react";
import Balance from "../../components/Balance";

export async function loader() {
  // TODO fetch products
  const response = await fetch(`/admin/plugin/deepseek?type=balance`);
  const balance = await response.json();

  return balance;
}

const DeepSeekPage = () => {
  const { balance } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div className="@container">
      <div className="text-center py-16">
        <DeepSeekLogo className="h-16 inline-block" />
      </div>
      <Balance balance={balance}/>
    </div>
  );
};

export const config = defineRouteConfig({
  label: "DeepSeek",
  icon: DeepSeekIcon,
});

export default DeepSeekPage;
