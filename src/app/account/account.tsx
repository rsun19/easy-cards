/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import React from "react";
import { Button, Card, Group, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { updateUsername } from "../lib/updateUsername";
import { useRouter } from "next/navigation";
import { type AccessTokenResponse } from "@/types";
import { getAccessToken } from "../lib/getAccessToken";

interface AccountProps {
  username: string;
  accessToken: string;
  refreshToken: string;
}

const Account: React.FC<AccountProps> = ({
  accessToken,
  refreshToken,
  username,
}): React.JSX.Element => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
    },

    validate: {
      username: (value: string) =>
        value !== "" && /^[a-zA-Z0-9_-]+$/.test(value)
          ? null
          : "Usernames can only contain letters, numbers, underscores, and dashes",
    },
  });

  const router = useRouter();

  const handleSubmit = async (param: { username: string }): Promise<void> => {
    try {
      // eslint-disable-next-line no-void
      const statusCode = await updateUsername(accessToken, param);
      if (statusCode === 401) {
        const response = await getAccessToken(refreshToken);
        if (response.ok) {
          const textResponse = await response.text();
          const textResponseJSON: AccessTokenResponse =
            JSON.parse(textResponse);
          // eslint-disable-next-line no-void
          const statusCodeRetry = await updateUsername(
            textResponseJSON.accessToken,
            param,
          );
          if (statusCodeRetry === 403) {
            alert("This username is already taken.");
          } else {
            router.push("/");
          }
        } else {
          router.push("/api/signout");
        }
      } else if (statusCode === 403) {
        alert("This username is already taken.");
      } else {
        router.push("/");
      }
    } catch (e) {
      router.push("/");
    }
  };

  return (
    <>
      <div className="mt-3 flex justify-center items-center flex-col gap-3 mx-5">
        <Text>Hi {username}</Text>
        <Card
          className="w-full"
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <form
            onSubmit={form.onSubmit(async (values: { username: string }) => {
              await handleSubmit(values);
            })}
          >
            <TextInput
              label="Change your username"
              placeholder={username}
              key={form.key("username")}
              {...form.getInputProps("username")}
            />
            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Card>
        <a href="/api/signout" className="button px-6 py-3 bg-teal-500 rounded">
          Sign Out
        </a>
      </div>
    </>
  );
};

export default Account;
