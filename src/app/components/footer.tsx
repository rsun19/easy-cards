"use client";

import { Container, Group, Anchor, Text } from "@mantine/core";
import classes from "./Footer.module.css";
import React from "react";

const links = [
  { link: "/", label: "Contact" },
  { link: "/", label: "Privacy" },
];

export function Footer(): React.JSX.Element {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => {
        event.preventDefault();
      }}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text>Easy Cards</Text>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
