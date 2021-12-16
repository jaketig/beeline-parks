import * as React from "react";
import { Button } from '@mui/material'
import {builder, Builder} from "@builder.io/react";

builder.init(process.env.BUILDER_API_KEY)

export const MuiButon = (props) => {
  const buttonProps = {...props};
  delete buttonProps.builderBlock;
  delete buttonProps.builderState;
  delete buttonProps.text;

  return (
    <Button {...buttonProps}>{props.text}</Button>
  )
};

Builder.registerComponent(MuiButon, {
  name: "MuiButton",
  inputs: [
    {
      name: "text",
      type: "string",
      defaultValue: '',
    },
    {
      name: "color",
      type: "string",
      enum: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
      defaultValue: "primary",
    },
    {
      name: "href",
      type: "string",
      defaultValue: "#",
    },
    {
      name: "size",
      type: "string",
      enum: ['small', 'medium', 'large'],
      defaultValue: "medium",
    },
    {
      name: "variant",
      type: "string",
      enum: ['contained', 'outlined', 'text'],
      defaultValue: 'contained',
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: false,
    },
  ],
});