import * as React from "react";
import { Typography } from '@mui/material'
import {builder, Builder} from "@builder.io/react";

builder.init(process.env.BUILDER_API_KEY)

export const MuiTypography = (props) => {
  const typographyProps = {...props};
  delete typographyProps.builderBlock;
  delete typographyProps.builderState;
  delete typographyProps.text;

  return (
    <Typography {...typographyProps} dangerouslySetInnerHTML={{__html:props.text}}/>
  )
};

Builder.registerComponent(MuiTypography, {
  name: "MuiTypography",
  inputs: [
    {
      name: "text",
      type: "richText",
      defaultValue: 'Enter some text...',
    },
    {
      name: "align",
      type: "string",
      enum: ['center', 'inherit', 'justify', 'left', 'right'],
      defaultValue: "inherit",
    },
    {
      name: "variant",
      type: "string",
      enum: ['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2'],
      defaultValue: "body1",
    },
    {
      name: "component",
      type: "string",
      defaultValue: "div",
    },
  ],
});