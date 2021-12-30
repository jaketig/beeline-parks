import * as React from "react";
import { Card, CardContent } from '@mui/material'
import {builder, Builder} from "@builder.io/react";

builder.init(process.env.BUILDER_API_KEY)

export const MuiCard = (props) => {
  const cardProps = {...props};
  delete cardProps.builderBlock;
  delete cardProps.builderState;
  delete cardProps.children;

  return (
    <Card {...cardProps}>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  )
};

Builder.registerComponent(MuiCard, {
  name: "MuiCard",
  inputs: [

  ],
  // Adding defaults is important for easy usability
  defaultChildren: [
    {
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Text', options: { text: 'I am child text block!' } }
    }
  ]
});