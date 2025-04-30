import { defineRouteConfig } from "@medusajs/admin-sdk";
// import { useLoaderData } from "react-router-dom";
import { Container } from "@medusajs/ui";
import DeepSeekLogo from '../../icons/logo';
import DeepSeekIcon from "../../icons/sidebar-logo";

export async function loader() {
  // TODO fetch products
  const response = await fetch(`/admin/deepseek/balance`, {
    method: "POST",
  });
  const result = await response.json();

  return {
    balance: result,
  };
}

const DeepSeekPage = () => {
  // const { balance } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <div className="p-6 w-full align-right">
      <DeepSeekLogo className="h-16" />
      </div>
      <Container className="w-full">
        Hello
      </Container>
    </div>
  );
};

export const config = defineRouteConfig({
  label: "DeepSeek",
  icon: DeepSeekIcon,
});

export default DeepSeekPage;
