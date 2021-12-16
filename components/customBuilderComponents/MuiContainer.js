import { Builder, builder, withChildren } from '@builder.io/react';
import { Container } from '@mui/material'

builder.init(process.env.BUILDER_API_KEY)

export const MuiContainer = withChildren((props) => {
  const containerProps = {...props};
  delete containerProps.builderBlock;
  delete containerProps.builderState;
  delete containerProps.children;

  return (
    <Container {...containerProps}>{props.children}</Container>
  )
})

Builder.registerComponent(MuiContainer, {
  name: 'MuiContainer',
  inputs: [
    {
      name: "disableGutters",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "fixed",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "maxWidth",
      type: "string",
      enum: ['xs', 'sm', 'md', 'lg', 'xl'],
      defaultValue: "lg",
    },
  ],
  // Adding defaults is important for easy usability
  defaultChildren: [
    {
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Text', options: { text: 'I am child text block!' } }
    }
  ]
})
