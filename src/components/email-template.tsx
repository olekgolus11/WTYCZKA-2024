import * as React from "react";
import { Tailwind } from "@react-email/tailwind";
import { Row } from "@react-email/row";
import { Column } from "@react-email/column";
import { Img } from "@react-email/img";
import { Text } from "@react-email/text";

interface EmailTemplateProps {
  name: string;
  message: string;
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  message,
  email,
}) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            "primary-color": "#EE00AB",
            "secondary-color": "#ff4dcc",
            "active-color": "#b30080",
            "mobile-grey": "#050505",
          },
        },
      },
    }}
  >
    <Row className="bg-black p-8 text-center">
      <Column className="bg-black">
        <Text className="text-2xl font-semibold text-active-color tracking-wider text-center p-2">
          {name + " "}zadał pytanie odnośnie wyjazdu
        </Text>
      </Column>
      <Column className="bg-black">
        <Img
          src="https://iili.io/JJla1xp.png"
          alt="tripImage"
          width="250"
          height="200"
        />
      </Column>
    </Row>
    <Row className="bg-black p-8 text-center">
      <Column className="p-8 bg-mobile-grey rounded-2xl text-center">
        <Text className="text-center text-3xl font-medium italic text-slate-50 tracking-wide p-2">
          {message}
        </Text>
      </Column>
    </Row>
    <Row className="bg-black p-8 text-center">
      <Column className="text-center">
        <Text className="text-2xl font-semibold text-active-color tracking-wider text-center p-2">
          Możesz odpowiedzieć na to pytanie klikając odpowiedz w swojej
          aplikacji mailowej lub odpowiedzieć na email nadawcy: {email}
        </Text>
      </Column>
    </Row>
  </Tailwind>
);
